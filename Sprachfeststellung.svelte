<ul>
{#each vermerke as v}
<li>{v.Klasse} {v.Name}: {v.Bemerkung}</li>
{/each}
</ul>

<script>
  const mysql = R('mysql')
  export let knexConfig
  let vermerke = []
  knexConfig.connection.database="schild_kbk2"
  const mysql_connection = mysql.createConnection(knexConfig.connection)
  mysql_connection.connect()
  mysql_connection.query(`
                          SELECT schuelervermerke.*, schueler.Name, Schueler.Klasse
                          FROM schuelervermerke
                          LEFT JOIN schueler ON (schueler.ID = schuelervermerke.Schueler_ID)
                          WHERE Status = 2 AND AktSchuljahr = 2022 AND Geloescht = "-" AND Gesperrt = "-" and Vermerkart_ID = 7
                          ORDER BY Name DESC
                          `,
    (e, res) => {
      console.log(e)
      vermerke = res
    })
</script>
