<!--
Für diese Einstellung der Importfunktion in /var/lib/ucs-school-import/configs/user_import.json
Siehe auch https://docs.software-univention.de/ucsschool-import-handbuch-4.4.html
{
  "csv": {
          "mapping": {
                  "ID": "record_uid",
                  "Vornamen": "firstname",
                  "Nachname": "lastname",
                  "Klasse": "school_classes",
                  "Geburtstag": "birthday",
                  "Passwort": "password"
          }
  },
"scheme": {
  "username": {
      "student": "<record_uid>",
      "teacher": "<record_uid><:lower>"
  },
  "email": "<username><maildomain>"
  },
  "maildomain": "@die_domain",
  "school": "schule",
  "password_length": 8
}
-->
<script>
  import { updater } from './helfer';
  const mysql = R('mysql')
  export let knexConfig;
  let gruppe = new Map(), regel = [], foerder = [];
  let value = "";
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  knexConfig.connection.database="schild_kbk"
  const mysql_connection2 = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection2.connect();
  const query = `SELECT ID, Name, Vorname, Klasse, Geburtsdatum, GU_ID, Lehrer,
                CASE WHEN ASDSchulform LIKE "A%" THEN 1 WHEN ASDSchulform = "Fac" THEN 1 ELSE 2 END as Schulform
                FROM schueler
                WHERE Status = 2 AND Geloescht = "-" AND Gesperrt = "-"
                ORDER BY Klasse, Name ASC`
  mysql_connection.query(query, async (e,res)=> e ? console.log(e, "reg"): (regel = res))
  mysql_connection2.query(query, async (e,res)=> e ? console.log(e, "förder"): (foerder = res))
  $: {
    if (regel.length && foerder.length) {
      const g = new Map();
      const liste = updater(regel.concat(foerder));
      liste.sort((a,b) => a.Schulform - b.Schulform);
      for (const i of liste) {
        const klasse = g.get(i.Klasse);
        if (!klasse) {
          g.set(i.Klasse, [i]);
        } else {
          klasse.push(i);
          g.set(i.Klasse, klasse);
        }
      }
      gruppe = g;
    }
  };

</script>
<input bind:value />
{#each [...gruppe] as [klasse, schueler]}
  {#if klasse.toLocaleLowerCase().includes(value.toLocaleLowerCase())}
    <div>{klasse}</div>
    <pre>realname;displayname;username;email;about_me
{#each schueler as s}{s.Vorname} {s.Name};{s.Vorname} {s.Name};{s.username};;<br>{/each}</pre>
{/if}
{/each}