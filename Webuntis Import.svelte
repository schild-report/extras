<script>
  const mysql = R("mysql");
  import { updater } from './helfer';
  export let knexConfig, privat
  let regel = [], foerder = [];
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  knexConfig.connection.database="schild_kbk"
  const mysql_connection2 = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection2.connect();
  const query = `
                SELECT s.ID, s.Name, s.Vorname, s.Klasse,
                  CASE s.Geschlecht WHEN 3 THEN 'm' ELSE 'w' END as Geschlecht,
                  s.Geburtsdatum, s.SchulnrEigner as Schulnummer
                FROM schueler AS s
                WHERE Status = 2 AND Geloescht = "-" AND Gesperrt = "-"
                ORDER BY Klasse, Name ASC`
  mysql_connection.query(query, (e,res)=> e ? console.log(e, "reg"): (regel = updater(res, privat)));
  mysql_connection2.query(query, (e,res)=> e ? console.log(e, "förder"): (foerder = updater(res, privat)));
  $: gruppe = [...regel, ...foerder]
</script>

<pre>{#if gruppe}{#each gruppe as s}{s.ID},{s.Name},{s.Vorname},{s.Klasse},{s.Geschlecht},{s.Geburtsdatum}<br>{/each}{/if}</pre>
