<script>
  const mysql = R("mysql");
  export let knexConfig
  let gruppe = []
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection.query(
    ` SELECT Nachname, Vorname, Email, Kuerzel FROM k_lehrer WHERE Sichtbar="+";`,
    (e, res) => {
      console.log(e);
      gruppe = res;
    }
  );
</script>

<pre>
{#each gruppe as s}
{s.Kuerzel},{s.Nachname},{s.Vorname},{s.Email}<br>
{:else}kommt...
{/each}
</pre>