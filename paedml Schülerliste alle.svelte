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
  export let knexConfig, privat, gruppe;
  if (!privat.paedml_salt) throw "Kein Salt";
  const hashids = new Hashids(
    privat.paedml_salt,
    8,
    "abcdefghkmnpqrstuvwxyz23456789"
  );
  const h = (id) => hashids.encode(id);
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  const hasNonAsciiCharacters = (str) => /[^\u0000-\u007f]/.test(str);

  mysql_connection.query(
    `SELECT ID, Name, Vorname, Klasse, Geburtsdatum
                          FROM schueler
                          WHERE Status = 2 AND Geloescht = "-" AND Gesperrt = "-"
                          ORDER BY Klasse, Name ASC`,
    (e, res) => {
      console.log(e);
      gruppe = res;
      for (const g of gruppe) {
        if (hasNonAsciiCharacters(g.Name + g.Vorname))
          console.log(g.Vorname, g.Name);
      }
    }
  );
const klasse = k => /^.*[0-9]{2,}.*?$/.test(k) ? k.slice(0, -1) : k

</script>
{#if gruppe}
<pre>
ID,Nachname,Vornamen,Klasse,Passwort,Geburtstag,Email
{#each gruppe as s}
b{s.ID},{s.Name},{s.Vorname},{klasse(s.Klasse)},{h( s.ID)},{new Date(s.Geburtsdatum).toJSON().slice(0, 10)},{slugify(s.Vorname)}.{slugify(s.Name)}@fvb-berufskolleg.de<br>
{/each}
</pre>
{/if}
