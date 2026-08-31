<script>
  const mysql = R("mysql");
  export let knexConfig
  let gruppe = []
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection.query(
    ` SELECT ID, Nachname, Vorname, Kuerzel, Geschlecht FROM k_lehrer WHERE Sichtbar="+";`,
    (e, res) => {
      console.log(e);
      gruppe = res;
    }
  );
</script>

<pre>
Nachname;Vorname;Kuerzel;Geschlecht
{#each gruppe as s}
{s.Nachname};{s.Vorname};{s.Kuerzel};{s.Geschlecht === "3" ? "M":"W"}<br>
{:else}kommt...
{/each}
</pre>