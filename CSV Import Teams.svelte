<pre>
Benutzername,Vorname,Nachname,Anzeigename,Position,Abteilung,Telefon – Geschäftlich,Telefon (geschäftlich),Mobiltelefon,Fax,Alternative E-Mail-Adresse,Adresse,Ort,Bundesstaat,Postleitzahl,Land oder Region
{#each schueler as s}
b{s.ID}@{privat.domain},{s.Name},{s.Vorname},{`${s.Vorname} ${s.Name}`},schueler,,,,,,,,Bielefeld,NW,,DE<br>
{/each}
</pre>

<script>
  const mysql = R('mysql')
  export let knexConfig, privat
  let schueler = []
  const mysql_connection = mysql.createConnection(knexConfig.connection)
  mysql_connection.connect()
  mysql_connection.query(`SELECT ID, Name, Vorname
                          FROM schueler
                          WHERE Status = 2 AND Geloescht = "-" AND Gesperrt = "-"
                          ORDER BY Klasse, Name ASC`,
    (e, res) => {
      console.log(e)
      schueler = res
    })
</script>