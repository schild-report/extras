<script>
  const mysql = R("mysql");
  export let knexConfig
  let gruppe
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection.query(
    `
  SELECT s.ID, s.Name, s.Vorname, a.Jahr, s.Klasse, ff.FachKrz, f.FachLehrer
  FROM schueler AS s
  LEFT JOIN schuelerlernabschnittsdaten AS a ON (a.Schueler_ID = s.ID AND a.Jahr = s.AktSchuljahr)
  LEFT JOIN schuelerleistungsdaten AS f ON (f.Abschnitt_ID = a.ID)
  LEFT JOIN eigeneschule_faecher AS ff ON (ff.ID = f.Fach_ID)
  WHERE Status = 2 AND Geloescht = "-" AND Gesperrt = "-"
  ORDER BY Klasse, Name ASC`,
    (e, res) => {
      console.log(e);
      gruppe = res;
    }
  );
</script>

<pre>
id|name|vorname|jahr|klasse|kurs|kurs_lehrer
{#if gruppe}
{#each gruppe as s}
{s.ID}|{s.Name}|{s.Vorname}|{s.Jahr}|{s.Klasse}|{s.FachKrz||""}|{s.FachLehrer||""}<br>
{/each}
{/if}
</pre>