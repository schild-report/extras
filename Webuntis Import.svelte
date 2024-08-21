<script>
  const mysql = R("mysql");
  import { updater, datum } from './helfer';
  export let knexConfig, privat
  let regel = [], foerder = [], gruppe = [];
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  knexConfig.connection.database="schild_kbk"
  const mysql_connection2 = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection2.connect();
  const query = `
                SELECT s.ID, s.Name, s.Vorname, s.Klasse, s.GU_ID,
                  CASE s.Geschlecht WHEN 3 THEN 'm' WHEN 4 THEN 'w' ELSE 'd' END as Geschlecht, Geburtsdatum,
                  DATE_FORMAT(s.Geburtsdatum, "%d.%m.%Y") as Datum
                FROM schueler AS s
                WHERE Status = 2 AND Geloescht = "-" AND Gesperrt = "-"
                ORDER BY Klasse, Name ASC`
  mysql_connection.query(query, (e,res)=> e ? console.log(e, "reg"): (regel = res));
  mysql_connection2.query(query, (e,res)=> e ? console.log(e, "förder"): (foerder = res));
  $: {
    if (regel.length && foerder.length)
      gruppe = updater([...regel, ...foerder]);
    }
</script>

<pre>{#if gruppe.length}{#each gruppe as s}{s.username},{s.Name},{s.Vorname},{s.Klasse},{s.Geschlecht},{s.Datum}<br>{/each}{/if}</pre>
