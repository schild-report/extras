<script>
  const mysql = R("mysql");
  const fs = R("fs");
  import { updater } from './helfer'
  export let knexConfig;
  let base = "/tmp/fotos";
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection.query(
    `
  SELECT f.Foto, s.ID, s.GU_ID, s.Vorname, s.Name, s.Geburtsdatum
  FROM schuelerfotos AS f
  JOIN schueler AS s ON (f.Schueler_ID = s.ID)
  WHERE s.Status = 2 AND s.Geloescht = "-" AND s.Gesperrt = "-"
  `,
    (e, res) => {
      console.log(e, res.length);
      updater(res).forEach((f) => {
          const data = new Uint8Array(Buffer.from(f.Foto, "binary"));
          fs.writeFile(`${base}/${f.username}.jpg`, data, (err) => {
            if (err) throw err;
          });
        });
      });
</script>

Fotos werden unter
<b>{base}</b>
abgelegt. Verzeichnis muss vorhanden sein.
