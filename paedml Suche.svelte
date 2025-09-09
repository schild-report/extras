
<script>
  import { updater } from './helfer'
  const mysql = R("mysql");
  export let knexConfig
  let regel = [], foerder = [], schueler = [], error;
  let value = "", checked = false;
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  knexConfig.connection.database="schild_kbk"
  const mysql_connection2 = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection2.connect();
  const query = `SELECT s.ID, Name, Vorname, Klasse, Geburtsdatum, GU_ID
                          FROM schueler s
                          WHERE s.Status = 2 AND s.Geloescht = "-" AND s.Gesperrt = "-"
                          ORDER BY Klasse, Name ASC`
  mysql_connection.query(query, async (e,res)=> e ? console.log(e, "reg"): (regel = res))
  mysql_connection2.query(query, async (e,res)=> e ? console.log(e, "förder"): (foerder = res))
  $: {
    try {
      if ((regel.length > 0) && (foerder.length > 0)) {
        schueler = updater(regel.concat(foerder));
        console.log('Datensätze verarbeitet: ', schueler.length + '/' + (regel.length+foerder.length));
      }
    } catch (e) {
      error = e.message;
    }
  };
  $: filtered = schueler.filter(s => s.Name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) || s.Vorname.toLocaleLowerCase().includes(value.toLocaleLowerCase()) || s.Klasse.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
</script>
<input bind:value /><input type="checkbox" bind:checked /> Klasse
{#if filtered.length}
<pre>{#each filtered as s}{`names.set("${s.GU_ID}", {${checked ? 'klasse':'username'}: "${checked ? s.Klasse : s.username}"});// ${s.Vorname} ${s.Name};`}<br>{/each}</pre>
{/if}
{#if error}
  {@html error}
{/if}