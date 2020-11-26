<script>
  const mysql = R("mysql");
  export let knexConfig
  let gruppe = []
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection.query(
    ` SELECT ID, Nachname, Vorname, (SELECT Schuljahr FROM eigeneschule) AS jahr FROM k_lehrer WHERE Sichtbar="+";`,
    (e, res) => {
      console.log(e);
      gruppe = res;
    }
  );
</script>

<pre>
id|name|vorname|jahr
{#each gruppe as s}
{s.ID}|{s.Nachname}|{s.Vorname}|{s.jahr}<br>
{:else}kommt...
{/each}
</pre>