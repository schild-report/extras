<script>
  const mysql = R("mysql");
  const _ = R("lodash");
  export let knexConfig;
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  let gruppe = [];
  mysql_connection.query(
    `SELECT a.Bezeichnung, e.Vorname1, e.Name1, e.ErzStrasse, e.ErzPLZ, s.Vorname, s.Name, DATE_FORMAT(s.Geburtsdatum, "%d.%m.%Y") as Datum
                          FROM schueler AS s
                          JOIN schuelererzadr AS e ON e.Schueler_ID = s.ID
                          JOIN k_erzieherart AS a ON e.Erzieherart_ID = a.ID
                          WHERE s.Status = 2 AND s.Geloescht = "-" AND s.Gesperrt = "-" AND s.Volljaehrig = "-"
                          ORDER BY Name ASC`,
    (e, res) => {
      console.log(e);
      gruppe = res;
    }
  );
</script>

{#if gruppe.length}
<pre>ID,Nachname,Vornamen,Klasse,Passwort,Geburtstag,Email
{#each gruppe as s}{Object.values(s).join(', ')}<br>{/each}</pre>
{/if}
