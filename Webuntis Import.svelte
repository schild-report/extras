<script>
  const mysql = R("mysql");
  export let knexConfig
  let gruppe
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection.query(
    `
  SELECT s.ID, s.Name, s.Vorname, s.Klasse, CASE s.Geschlecht WHEN 3 THEN 'm' ELSE 'w' END
  FROM schueler AS s
  WHERE Status = 2 AND Geloescht = "-" AND Gesperrt = "-"
  ORDER BY Klasse, Name ASC`,
    (e, res) => {
      console.log(e);
      gruppe = res;
    }
  );
</script>

<pre>
{#if gruppe}
{#each gruppe as s}
  {Object.values(s).join(',')}<br>
{/each}
{/if}
</pre>
