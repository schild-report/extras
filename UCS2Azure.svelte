
<script>
  import Hashids from "hashids";
  import {slugify} from './helfer'
  const mysql = R("mysql");
  export let knexConfig, privat
  let regel;
  if (!privat.paedml_salt) throw "Kein Salt";
  const hashids = new Hashids( privat.paedml_salt, 8, "abcdefghkmnpqrstuvwxyz23456789");
  knexConfig.connection.database="schild_kbk2"
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  const query = `SELECT ID, Name, Vorname, Klasse, ASDSchulform
                          FROM schueler
                          WHERE Status = 2 AND Geloescht = "-" AND Gesperrt = "-" AND NOT ASDSchulform LIKE "A%" AND NOT ASDSchulform = "Fac"
                          ORDER BY Klasse, Name ASC`
  mysql_connection.query(query, (e,res)=> e ? console.log(e, "reg"): (regel=res))
</script>
{#if regel}
<pre>
{#each regel as s}python2 connect_existing_users.py -p {s.ASDSchulform} {slugify(s.Vorname).toLowerCase()}.{slugify(s.Name).toLowerCase()}@fvb-berufskolleg.de -u b{s.ID} -a -m<br>{/each} 
</pre>
{/if}
