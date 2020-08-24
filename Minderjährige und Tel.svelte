<script>
  const mysql = R("mysql");
  const _ = R("lodash");
  export let knexConfig, gruppe;
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection.query(
    `SELECT s.ID, s.Name, s.Vorname, s.Klasse, t.Telefonnummer, a.Bezeichnung
                          FROM schueler AS s
                          JOIN schuelertelefone AS t ON t.Schueler_ID = s.ID
                          JOIN k_telefonart AS a ON t.TelefonArt_ID = a.ID
                          WHERE s.Status = 2 AND s.Geloescht = "-" AND s.Gesperrt = "-" AND s.Volljaehrig = "-"
                          ORDER BY Klasse, Name ASC`,
    (e, res) => {
      console.log(e);
      gruppe = res;
    }
  );
</script>

<style>
  @import "css/main.css";
</style>

{#if gruppe}
  {#each Object.entries(_.groupBy(gruppe, 'Klasse')) as [klasse, schueler]}
    <div style="margin-top: 3rem">
      <b>{klasse}</b>
    </div>
    {#each Object.entries(_.groupBy(schueler, 'ID')) as [id, s]}
      <table>
        <tr>
          <td>
            <b>{s[0].Name}, {s[0].Vorname}</b>
          </td>
          <td />
        </tr>
        {#each s as t}
          <tr>
            <td>{t.Bezeichnung}</td>
            <td>{t.Telefonnummer}</td>
          </tr>
        {/each}
      </table>
      <hr />
    {/each}
  {/each}
{/if}
