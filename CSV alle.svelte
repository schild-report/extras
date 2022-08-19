{#if gruppe}
  <pre>
    {#each gruppe as s}
      <br>{s.Name},{s.Vorname},{s.Klasse.slice(0, -1)},{s.EMail}
    {/each}
  </pre>
{/if}

<script>
  const mysql = R('mysql')
  export let schueler, knexConfig, privat, gruppe
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
</script>
