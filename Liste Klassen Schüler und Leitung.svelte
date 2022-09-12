<script>
  const mysql = R("mysql");
  import { groupBy } from "./helfer";
  export let knexConfig, privat;
  let regel, foerder;
  if (!privat.paedml_salt) throw "Kein Salt";
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  knexConfig.connection.database = "schild_kbk";
  const mysql_connection2 = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection2.connect();
  const query = `SELECT s.ID, Name, Vorname, Klasse, Geburtsdatum, Lehrer,
														CASE 
															WHEN SUBSTRING(ASDSchulform,1,1)='A' THEN 'A'
															ELSE 'B'
														END as Anlage
                          FROM schueler s
                          WHERE s.Status = 2 AND s.Geloescht = "-" AND s.Gesperrt = "-"
                          ORDER BY Klasse, Name ASC`;
  mysql_connection.query(query, (e, res) =>
    e ? console.log(e, "reg") : (regel = res)
  );
  mysql_connection2.query(query, (e, res) =>
    e ? console.log(e, "förder") : (foerder = res)
  );

  let gruppe;
  $: if (regel && foerder)
    gruppe = groupBy([].concat(regel, foerder), "Anlage");
  $: console.log(gruppe);
</script>

{#if gruppe}
  {#each [...gruppe.entries()] as [anlage,schueler]}
    <div
      class="page"
      orientation="portrait"
      size="A4"
      style="font-family: sans; font-size: .8rem"
    >
      <div style="padding: .3in 1in">
				<b>Anlage {anlage === "A"?"A":"B-E"}</b>
				<table border="1" style="border-collapse: collapse; width: 30%">
						{#each [...groupBy(schueler, "Klasse").entries()].sort((a,b)=>a.Klasse > b.Klasse ? -1: 1) as [klasse, schueler], i}
						<tr>
							<td>{i+1}</td><td>{klasse}</td><td>{schueler[0].Lehrer}</td><td>{schueler.length}</td>
						</tr>
						{/each}
					</table>
      </div>
    </div>
  {/each}
{/if}

<style>
  @import "css/main.css";
  .page {
    padding: 0;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 20px;
  }
</style>
