<script>
  const mysql = R("mysql");
  export let knexConfig, privat
  let gruppe = [], regel, foerder
  const klasse = k => /^.*[0-9]{2,}.*?$/.test(k) ? k.slice(0, -1) : k;
  const prefix = (s) => String(s.SchulnrEigner) === String(privat.schulnummer) ? "b":"k";
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  knexConfig.connection.database="schild_kbk"
  const mysql_connection2 = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection2.connect();
  const query = `
  SELECT s.ID, s.Name, s.Vorname, s.Klasse, CASE s.Geschlecht WHEN 3 THEN 'm' ELSE 'w' END as Geschlecht, DATE_FORMAT(Geburtsdatum, "%d.%m.%Y") as Geburtsdatum, s.SchulnrEigner
  FROM schueler AS s
  WHERE Status = 2 AND Geloescht = "-" AND Gesperrt = "-"
  ORDER BY Klasse, Name ASC`
  mysql_connection.query(query, async (e,res)=> e ? console.log(e, "reg"): (regel = await updater(res)))
  mysql_connection2.query(query, async (e,res)=> e ? console.log(e, "förder"): (foerder = await updater(res)))
  $: if (regel && foerder) gruppe = gruppe.concat(regel, foerder)
</script>

<pre>{#if gruppe}{#each gruppe as s}{prefix(s)+s.ID},{s.Name},{s.Vorname},{klasse(s.Klasse)},{s.Geschlecht},{s.Geburtsdatum}<br>{/each}{/if}</pre>
