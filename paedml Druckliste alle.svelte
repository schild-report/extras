{#if gruppe}
  {#each Object.entries(_.groupBy(gruppe, 'Klasse')) as [klasse, schueler]}
    {#each _.chunk(schueler, 6) as slice}
      <div class="page" orientation="portrait" size="A4" style="font-family: sans; font-size: .98rem">
        <div class="grid">
          <div style="display: flex; justify-content: space-between; padding: 8px 8px 0px 8px;">
            <div><b>{klasse}</b></div> 
            <div>{datum(Date.now())}</div>
          </div>
          {#each slice as s}
            <div>
              <table style="width: 90%; margin-bottom: 8px; margin-left: 25px">
                <tr>
                  <td colspan="2"><b>{s.Name}, {s.Vorname}</b></td>
                </tr>
                <tr>
                  <td width="25%">Ihr Benutzername: <code> {s.username}</code></td>
                  <td>Ihr Passwort: <code>{h(s.hash)}</code></td>
                </tr>
                <tr>
                  <td colspan="2">Teams: <code>{s.slug}@{privat.domain}</code></td>
                </tr>
              </table>
            <div style="padding: 0 10px 0 30px;">
              <b>Zugangsdaten zum Pädagogischen Netz des {privat.schulname} für das Schuljahr 2024/25</b>
              <br>Mit der Verwendung der Zugangsdaten bestätigen Sie Ihre Zustimmung zur Nutzungsordnung für das
              Pädagogische Netz.
              <br>Unter <b>https://{privat.meinbk}</b> können Sie einen persönlichen WLAN-Zugang anfordern.
              <br>Heben Sie diesen Zettel das ganze Schuljahr über gut auf und <b>machen Sie zur Sicherheit ein Foto davon.</b>
            </div>
            </div>
            <hr>
          {/each}
        </div>
      </div>
    {/each}
{/each}
{/if}

<style>
  @import 'css/main.css';
  .page {padding: 0;}
  .grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 8px;
}
</style>

<script>
  import Hashids from 'hashids';
  import { datum, updater } from './helfer';
  const mysql = R('mysql');
  const _ = R('lodash');
  export let knexConfig, privat;
  let regel = [], foerder = [], gruppe = [];
  if (!privat.paedml_salt || !privat.schulname || !privat.meinbk) throw "Daten privat fehlen"
  const hashids = new Hashids(privat.paedml_salt, 8, 'abcdefghkmnpqrstuvwxyz23456789')
  const h = (id) => hashids.encode(id)
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  knexConfig.connection.database="schild_kbk"
  const mysql_connection2 = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection2.connect();
  const query = `SELECT ID, Name, Vorname, Klasse, Geburtsdatum, GU_ID
                FROM schueler
                WHERE Status = 2 AND Geloescht = "-" AND Gesperrt = "-"
                ORDER BY ASDSchulform, Klasse, Name ASC`
  mysql_connection.query(query, async (e,res)=> e ? console.log(e, "reg"): (regel = res))
  mysql_connection2.query(query, async (e,res)=> e ? console.log(e, "förder"): (foerder = res))
  $: {
    if (regel.length && foerder.length)
      gruppe = updater(regel.concat(foerder));
    };
</script>
