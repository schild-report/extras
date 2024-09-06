<script>
  const mysql = R("mysql");
  const _ = R("lodash");
  export let knexConfig;
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  let gruppe = [];
  mysql_connection.query(
    `
  SELECT s.Name, s.Vorname, s.Klasse, DATE_FORMAT(s.Geburtsdatum, "%d.%m.%Y") as Datum, GROUP_CONCAT(k.KurzBez), GROUP_CONCAT(ff.FachKrz)
  FROM schueler AS s
  LEFT JOIN schuelerlernabschnittsdaten AS a ON (a.Schueler_ID = s.ID AND a.Jahr = s.AktSchuljahr)
  LEFT JOIN schuelerleistungsdaten AS f ON (f.Abschnitt_ID = a.ID)
  LEFT JOIN kurse AS k ON (k.ID = f.Kurs_ID)
  LEFT JOIN eigeneschule_faecher AS ff ON (ff.ID = f.Fach_ID)
  WHERE Status = 2 AND Geloescht = "-" AND Gesperrt = "-"
  GROUP BY Name`,
    (e, res) => {
      console.log(e);
      gruppe = res;
    }
  );
</script>

{#if gruppe.length}
<pre>
{#each gruppe as s}{Object.values(s).join(', ')}<br>{/each}</pre>
{/if}
