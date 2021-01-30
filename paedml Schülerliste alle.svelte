{#if gruppe}
  <pre>
    {#each gruppe as s}
      <br>b{s.ID},{s.Name},{s.Vorname},{s.Klasse.slice(0, -1)},{h(s.ID)},{datum(s.Geburtsdatum)}
    {/each}
  </pre>
{/if}

<script>
  import Hashids from 'hashids'
  import {datum} from './helfer'
  const mysql = R('mysql')
  export let knexConfig, privat, gruppe
  if (!privat.paedml_salt) throw 'Kein Salt'
  const hashids = new Hashids(privat.paedml_salt, 8, 'abcdefghkmnpqrstuvwxyz23456789')
  const h = (id) => hashids.encode(id)
  const mysql_connection = mysql.createConnection(knexConfig.connection)
  mysql_connection.connect()
  mysql_connection.query(`SELECT ID, Name, Vorname, Klasse, Geburtsdatum
                          FROM schueler
                          WHERE Status = 2 AND Geloescht = "-" AND Gesperrt = "-"
                          ORDER BY Klasse, Name ASC`,
    (e, res) => {
      console.log(e)
      gruppe = res
    })
</script>