{#if gruppe}
  {#each Object.entries(_.groupBy(gruppe, 'Klasse')) as [klasse, schueler]}
    {#each _.chunk(schueler, 6) as slice}
      <div class="page" orientation="portrait" size="A4" style="font-family: sans">
        <div class="grid">
          <b style="padding: 5px 0 0 5px">{klasse}</b>
          {#each slice as s}
            <div style="padding: 0 30px 0 30px;">
              Bitte beachten Sie, mit der Verwendung der Zugangsdaten
              bestätigen Sie, dass sie die Sie die Nutzungsordnung für das
              pädagogische Netz gelesen und zugestimmt haben.
            </div>
            <div>
              <table style="width: 100%; margin-bottom: 10px; margin-left: 30px">
                <tr>
                  <td style="width: 50%"><b>{s.Name}, {s.Vorname}</b></td>
                  <td>Ihr Benutzername: b{s.ID}</td>
                </tr>
                <tr>
                  <td></td>
                  <td>Ihr Passwort: {h(s.ID)}</td>
                </tr>
              </table>
            <div style="padding: 0 30px 0 30px;">
              Zugang zu ihrer persönlichen BK-Seite haben Sie unter <b>mein.bk-bethel.de</b>
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
  export let schueler, knexConfig, privat, gruppe
  if (!privat.paedml_salt) throw 'Kein Salt'
  const hashids = new Hashids(privat.paedml_salt, 8, 'abcdefghkmnpqrstuvwxyz23456789')
  const h = (id) => hashids.encode(id)
  const mysql_connection = mysql.createConnection(knexConfig.connection)
  mysql_connection.connect()
  mysql_connection.query(`SELECT ID, Name, Vorname, Klasse
                          FROM schueler
                          WHERE Status = 2 AND Geloescht = "-" AND Gesperrt = "-"
                          ORDER BY Klasse, Name ASC`,
    (e, res) => {
      console.log(e)
      gruppe = res
    })
  const _ = R('lodash')
</script>
