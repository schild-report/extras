
<script>
  import Hashids from "hashids";
  import {slugify} from './helfer'
  const mysql = R("mysql");
  export let knexConfig, privat
  let regel;
  if (!privat.paedml_salt) throw "Kein Salt";
  const hashids = new Hashids(
    privat.paedml_salt,
    8,
    "abcdefghkmnpqrstuvwxyz23456789"
  );
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  knexConfig.connection.database="schild_kbk"
  const mysql_connection2 = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  // mysql_connection2.connect();
  const hasNonAsciiCharacters = (str) => /[^\u0000-\u007f]/.test(str);
  const query = `SELECT ID, Name, Vorname, Klasse
                          FROM schueler
                          WHERE Status = 2 AND Geloescht = "-" AND Gesperrt = "-" AND Klasse LIKE "%23_1"
                          ORDER BY Klasse, Name ASC`
  mysql_connection.query(query, (e,res)=> e ? console.log(e, "reg"): (regel=res))
  // mysql_connection2.query(query, (e,res)=> e ? console.log(e, "förder"): (foerder=res))
</script>
{#if regel}
<pre>
<!-- {#each regel as s}./o365_connect_azure_to_ucs_user.py -p {slugify(s.Vorname)}.{slugify(s.Name)}@fvb-berufskolleg.de -u b{s.ID} -a -m {s.Klasse}<br>{/each} -->
{#each regel as s}python2 connect_existing_users.py -p {slugify(s.Vorname).toLowerCase()}.{slugify(s.Name).toLowerCase()}@fvb-berufskolleg.de -u b{s.ID} -a -m<br>{/each} 
</pre>
{/if}
