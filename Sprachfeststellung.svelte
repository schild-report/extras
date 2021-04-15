<ul>
{#each vermerke as v}
<li>{v.Name} {v.Vermerkart_ID}: {v.Bemerkung}</li>
{/each}
</ul>

<script>
  const mysql = R('mysql')
  export let knexConfig
  let vermerke = []
  const mysql_connection = mysql.createConnection(knexConfig.connection)
  mysql_connection.connect()
  mysql_connection.query(`
                          SELECT schuelervermerke.*, schueler.Name
                          FROM schuelervermerke
                          LEFT JOIN schueler ON (schueler.ID = schuelervermerke.Schueler_ID)
                          ORDER BY Vermerkart_ID DESC
                          `,
    (e, res) => {
      console.log(e)
      vermerke = res
    })
</script>
