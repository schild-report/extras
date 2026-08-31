<script>
  const mysql = R("mysql");
  const fs = R("fs");
  import { updater } from './helfer'
  export let knexConfig;
  let base = "/tmp/fotos";
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  knexConfig.connection.database="schild_kbk"
  const mysql_connection2 = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection2.connect();
  const query =
    `
  SELECT f.Foto, s.ID, s.GU_ID, s.Vorname, s.Name, s.Geburtsdatum
  FROM schuelerfotos AS f
  JOIN schueler AS s ON (f.Schueler_ID = s.ID)
  WHERE s.Status = 2 AND s.Geloescht = "-" AND s.Gesperrt = "-"
  `;
  const qf = (e, res) => {
      console.log(e, res.length);
      updater(res).forEach((f) => {
          const data = new Uint8Array(Buffer.from(f.Foto, "binary"));
          fs.writeFile(`${base}/${f.username}.jpg`, data, (err) => {
            if (err) throw err;
          });
        });
      };
  mysql_connection.query(query, qf);
  mysql_connection2.query(query, qf);
</script>

Fotos werden unter
<b>{base}</b>
abgelegt. Verzeichnis muss vorhanden sein.
