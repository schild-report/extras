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
  "maildomain": "@bkbethel.de",
  "school": "schule",
  "password_length": 8
}
-->
<script>
  import Hashids from "hashids";
  import {slugify} from './helfer'
  const mysql = R("mysql");
  export let knexConfig, privat
  let regel, foerder;
  if (!privat.paedml_salt) throw "Kein Salt";
  const hashids = new Hashids(
    privat.paedml_salt,
    8,
    "abcdefghkmnpqrstuvwxyz23456789"
  );
  const h = (id) => hashids.encode(id);
  const klasse = k => /^.*[0-9]{2,}.*?$/.test(k) ? k.slice(0, -1) : k
  
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  knexConfig.connection.database="schild_kbk"
  const mysql_connection2 = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection2.connect();
  const hasNonAsciiCharacters = (str) => /[^\u0000-\u007f]/.test(str);
  const query = `SELECT ID, Name, Vorname, Klasse, Geburtsdatum
                          FROM schueler
                          WHERE Status = 2 AND Geloescht = "-" AND Gesperrt = "-"
                          ORDER BY Klasse, Name ASC`
  mysql_connection.query(query, (e,res)=> e ? console.log(e, "reg"): (regel=res))
  mysql_connection2.query(query, (e,res)=> e ? console.log(e, "förder"): (foerder=res))
</script>
{#if regel}
<pre>
ID,Nachname,Vornamen,Klasse,Passwort,Geburtstag,Email
{#each regel as s}b{s.ID},{s.Name},{s.Vorname},{klasse(s.Klasse)},{h( s.ID)},{new Date(s.Geburtsdatum).toJSON().slice(0, 10)},{slugify(s.Vorname)}.{slugify(s.Name)}@fvb-berufskolleg.de<br>{/each}{#each foerder as s}k{s.ID},{s.Name},{s.Vorname},{klasse(s.Klasse)},{h( s.ID)},{new Date(s.Geburtsdatum).toJSON().slice(0, 10)},{slugify(s.Vorname)}.{slugify(s.Name)}@fvb-berufskolleg.de<br>{/each}</pre>
{/if}
