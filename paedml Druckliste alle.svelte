{#if gruppe}
  {#each Object.entries(_.groupBy(gruppe, 'Klasse')) as [klasse, schueler]}
    {#each _.chunk(schueler, 6) as slice}
      <div class="page" orientation="portrait" size="A4" style="font-family: sans; font-size: .98rem">
        <div class="grid">
          <b style="padding: 5px 0 0 5px">{klasse}</b>
          {#each slice as s}
            <div>
              <table style="width: 80%; margin-bottom: 8px; margin-left: 30px">
                <tr>
                  <td style="width: 60%"><b>{s.Name}, {s.Vorname}</b></td>
                  <td>Ihr Benutzername: <code> {String(s.SchulnrEigner) === String(privat.schulnummer) ? "b":"k"}{s.ID}</code></td>
                </tr>
                <tr>
                  <td></td>
                  <td>Ihr Passwort: <code>{h(s.ID)}</code></td>
                </tr>
              </table>
            <div style="padding: 0 30px 0 30px;">
              <b>Zugangsdaten zum Pädagogischen Netz des {privat.schulname} für das Schuljahr 2022/23</b>
              <br>Bitte beachten Sie, mit der Verwendung der Zugangsdaten
              bestätigen Sie, dass sie die Sie die Nutzungsordnung für das
              pädagogische Netz gelesen und zugestimmt haben.
            Zugang zu ihrer persönlichen BK-Seite haben Sie unter <b>{privat.meinbk}</b>.
            Hier bekommen Sie auch einen persönlichen WLAN-Zugang. Heben Sie diesen Zettel das ganze Schuljahr über gut auf und machen Sie zur Sicherheit ein Foto davon.
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
    grid-gap: 20px;
}
</style>

<script>
  import Hashids from 'hashids'
  const mysql = R('mysql')
  export let knexConfig, privat
  let gruppe = [], regel, foerder
  if (!privat.paedml_salt) throw 'Kein Salt'
  if (!privat.schulnummer || !privat.paedml_salt || !privat.schulname || !privat.meinbk) throw "Daten privat fehlen"
  const hashids = new Hashids(privat.paedml_salt, 8, 'abcdefghkmnpqrstuvwxyz23456789')
  const h = (id) => hashids.encode(id)
  const mysql_connection = mysql.createConnection(knexConfig.connection);
knexConfig.connection.database="schild_kbk"
const mysql_connection2 = mysql.createConnection(knexConfig.connection);
mysql_connection.connect();
mysql_connection2.connect();
const query = `SELECT ID, Name, Vorname, Klasse, Geburtsdatum, SchulnrEigner
                        FROM schueler
                        WHERE Status = 2 AND Geloescht = "-" AND Gesperrt = "-"
                        ORDER BY Klasse, Name ASC`
mysql_connection.query(query, (e,res)=> e ? console.log(e, "reg"): (regel=res))
mysql_connection2.query(query, (e,res)=> e ? console.log(e, "förder"): (foerder=res))
$: if (regel && foerder) gruppe = gruppe.concat(regel, foerder)
  const _ = R('lodash')
</script>
