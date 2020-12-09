<script>
  const mysql = R("mysql");
  const fs = R("fs");
  const _ = R("lodash");
  export let knexConfig;
  let base = "/tmp/fotos";
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection.query(
    `
  SELECT f.Foto, s.ID, SUBSTRING(s.Klasse, 1, 4) AS Klasse
  FROM schuelerfotos AS f
  JOIN schueler AS s ON (f.Schueler_ID = s.ID)
  WHERE s.Status = 2 AND s.Geloescht = "-" AND s.Gesperrt = "-"
  `,
    (e, res) => {
      console.log(e, res.length);
      Object.entries(_.groupBy(res, "Klasse")).forEach((k) => {
        fs.mkdirSync(`${base}/${k[0]}`);
        k[1].forEach((f) => {
          const data = new Uint8Array(Buffer.from(f.Foto, "binary"));
          fs.writeFile(`${base}/${k[0]}/${f.ID}.jpg`, data, (err) => {
            if (err) throw err;
          });
        });
      });
    }
  );
</script>

Fotos werden unter
<b>{base}</b>
abgelegt. Verzeichnis muss vorhanden sein.
