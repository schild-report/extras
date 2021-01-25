<script>
  const mysql = R("mysql");
  import Hashids from 'hashids'
  export let knexConfig, privat
  const hashids = new Hashids(privat.paedml_salt, 8, 'abcdefghkmnpqrstuvwxyz23456789')
  function h (id) { return hashids.encode(id) }
  let gruppe = []
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection.query(
    ` SELECT * FROM k_lehrer WHERE Sichtbar="+";`,
    (e, res) => {
      console.log(e);
      gruppe = res;
      console.log(res)
    }
  );
</script>

<pre>
id|name|vorname|jahr
{#each gruppe as s}
{s.Kuerzel.toLowerCase()},{s.EMailDienstlich},{s.Vorname},{s.Nachname},{h(s.ID)}<br>
{:else}kommt...
{/each}
</pre>