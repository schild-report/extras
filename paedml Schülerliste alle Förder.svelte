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
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  knexConfig.connection.database="schild_kbk"
  const mysql_connection2 = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection2.connect();
  const query = `SELECT s.ID, Name, Vorname, Klasse, Geburtsdatum, 
                            SUBSTRING(ASDSchulform,1,1) as Anlage,
                            s.SchulnrEigner as Schulnummer,
                            f.Bezeichnung
                          FROM schueler s
                          JOIN eigeneschule_fachklassen f ON Fachklasse_ID=f.ID 
                          WHERE (s.Status = 2 OR s.Status = 6) AND s.Geloescht = "-" AND s.Gesperrt = "-"
                          ORDER BY Klasse, Name ASC`
  mysql_connection.query(query, (e,res)=> e ? console.log(e, "reg"): (regel=res))
  mysql_connection2.query(query, (e,res)=> e ? console.log(e, "förder"): (foerder=res))

  const create_row = s => {
    console.log(s.Schulnummer, privat.schulnummer)
    const prefix = s.Schulnummer === Number(privat.schulnummer) ? 'b':'k'
    const id = prefix + s.ID
    const klasse = s.Anlage === 'A' ? s.Bezeichnung.replace(/[\(|\)]/g,'') : s.Klasse.slice(0,-1)
    const password = h(s.ID) //fix TODO
    const geburtsdatum = new Date(s.Geburtsdatum).toJSON().slice(0, 10)
    const mail = `${slugify(s.Vorname)}.${slugify(s.Name)}@fvb-berufskolleg.de`
    return `${id},${s.Name},${s.Vorname},${klasse},${password},${geburtsdatum},${mail}`
  }
</script>
{#if regel}
<pre>ID,Nachname,Vornamen,Klasse,Passwort,Geburtstag,Email
{#each regel as s}{create_row(s)}<br>{/each}{#if foerder}{#each foerder as s}{create_row(s)}<br>{/each}{/if}</pre>{/if}
