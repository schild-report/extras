{#if gruppe}
  {#each Object.entries(_.groupBy(gruppe, 'Klasse')) as [klasse, schueler]}
    {#each _.chunk(schueler, 7) as slice}
      <div class="page" orientation="portrait" size="A4" style="font-family: sans; font-size: .99rem">
        <div style="display: flex; justify-content: space-between; padding: 8px 8px 0px 8px">
          <div><b>{klasse}</b></div>
          <div>{datum(Date.now())} - {schueler[0].Lehrer}</div>
        </div>
        <div class="grid">
          {#each slice as s}
            <div style="padding: 0 3rem 0 30px;">
              <div style="font-size: 1.2rem;"><b>{s.Name}, {s.Vorname}</b></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: .5rem; font-size: 1.2rem;">
                <div>Benutzername: <code> {s.username}</code></div>
                <div>Passwort: <code>{h(s.hash)}</code></div>
                <div>Teams: <code>{s.username}@{privat.domain}</code></div>
              </div>
              <b>Zugangsdaten zum Pädagogischen Netz des {privat.schulname} für das Schuljahr 2024/25</b>
              <br>Mit der Verwendung der Zugangsdaten bestätigen Sie Ihre Zustimmung zur Nutzungsordnung für das
              Pädagogische Netz.
              <br>Unter <b>https://{privat.meinbk}</b> können Sie einen persönlichen WLAN-Zugang anfordern.
              <br>Heben Sie diesen Zettel das ganze Schuljahr über gut auf und <b>machen Sie zur Sicherheit ein Foto davon.</b>
              <hr style="margin-top: 1rem;">
            </div>
          {/each}
        </div>
      </div>
    {/each}
{/each}
{/if}

<style>
  @import 'css/main.css';
  .page {
    padding: 0;
    display: flex;
    flex-flow: column;
    height: 100%;
  }
  .grid {
    flex: 1;
    display: grid;
    grid-template-rows: repeat(7, 1fr);
}
</style>

<script>
  import Hashids from 'hashids'
  import { datum, updater } from './helfer';
  const mysql = R('mysql')
  const _ = R('lodash')
  export let knexConfig, privat
  let gruppe = [], regel = [], foerder = [];
  if (!privat.schulnummer || !privat.paedml_salt || !privat.schulname || !privat.meinbk) throw "Daten privat fehlen"
  const hashids = new Hashids(privat.paedml_salt, 8, 'abcdefghkmnpqrstuvwxyz23456789')
  const h = (id) => hashids.encode(id)
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  knexConfig.connection.database="schild_kbk"
  const mysql_connection2 = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection2.connect();
  const query = `SELECT ID, Name, Vorname, Klasse, Geburtsdatum, GU_ID, Lehrer,
                CASE WHEN ASDSchulform LIKE "A%" THEN 1 WHEN ASDSchulform = "Fac" THEN 1 ELSE 2 END as Schulform
                FROM schueler
                WHERE Status = 2 AND Geloescht = "-" AND Gesperrt = "-"
                ORDER BY Klasse, Name ASC`
  mysql_connection.query(query, async (e,res)=> e ? console.log(e, "reg"): (regel = res))
  mysql_connection2.query(query, async (e,res)=> e ? console.log(e, "förder"): (foerder = res))
  $: {
    if (regel.length && foerder.length)
      gruppe = updater(regel.concat(foerder));
      gruppe.sort((a,b) => a.Schulform - b.Schulform)
    };
</script>
