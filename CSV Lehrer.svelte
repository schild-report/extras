<script>
  const mysql = R("mysql");
  export let knexConfig
  let gruppe = []
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection.query(
    ` SELECT ID, Nachname, Vorname, Kuerzel FROM k_lehrer WHERE Sichtbar="+";`,
    (e, res) => {
      console.log(e);
      gruppe = res;
    }
  );
</script>

<pre>
id,name,vorname,Kuerzel
{#each gruppe as s}
{s.ID},{s.Nachname},{s.Vorname},{s.Kuerzel}<br>
{:else}kommt...
{/each}
</pre>