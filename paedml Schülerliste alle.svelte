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
  import Hashids from "hashids";
  import {updater} from './helfer'
  const mysql = R("mysql");
  export let knexConfig, privat
  let regel = [], foerder = [];
  if (!privat.paedml_salt) throw "Kein Salt";
  if (!privat.domain) throw "Keine Domain";
  const hashids = new Hashids( privat.paedml_salt, 8, "abcdefghkmnpqrstuvwxyz23456789");
  const h = (id) => hashids.encode(id);
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  knexConfig.connection.database="schild_kbk"
  const mysql_connection2 = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection2.connect();
  // const hasNonAsciiCharacters = (str) => /[^\u0000-\u007f]/.test(str);
  const query = `SELECT s.ID, Name, Vorname, Klasse, Geburtsdatum, 
                            SUBSTRING(ASDSchulform,1,1) as Anlage,
                            s.SchulnrEigner as Schulnummer,
                            f.Bezeichnung
                          FROM schueler s
                          JOIN eigeneschule_fachklassen f ON Fachklasse_ID=f.ID 
                          WHERE s.Status = 2 AND s.Geloescht = "-" AND s.Gesperrt = "-"
                          ORDER BY Klasse, Name ASC`
  mysql_connection.query(query, async (e,res)=> e ? console.log(e, "reg"): (regel = updater(res, privat)))
  mysql_connection2.query(query, async (e,res)=> e ? console.log(e, "förder"): (foerder = updater(res, privat)))
  $: gruppe = [...regel, ...foerder]
</script>
{#if regel && foerder}
<pre>ID,Nachname,Vornamen,Klasse,Passwort,Geburtstag,Email
{#each regel as s}{s.prefix}{s.ID},{s.Name},{s.Vorname},{s.Klasse},{h(1+s.ID)},{s.Geburtsdatum},{s.slug}@{privat.domain}<br>{/each}{#each foerder as s}{s.prefix}{s.ID},{s.Name},{s.Vorname},{s.Klasse},{h(2+s.ID)},{s.Geburtsdatum},{s.slug}@{privat.domain}<br>{/each}</pre>
{/if}
<pre>{#if gruppe}{#each gruppe as s}{s.ID},{s.Name},{s.Vorname},{s.Klasse},{s.Geschlecht},{s.Geburtsdatum}<br>{/each}{/if}</pre>