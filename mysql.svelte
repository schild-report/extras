<script>
  export let schueler, knexConfig
  let s
  const mysql = R('mysql')
  const connection = mysql.createConnection(knexConfig.connection)
  connection.connect()
  console.log(connection)
  connection.query({
    sql:
`SELECT schueler.*,
        fachklasse.*,
        abschnitte.*
  FROM schueler
  JOIN eigeneschule_fachklassen fachklasse ON schueler.Fachklasse_ID = fachklasse.ID
  JOIN schuelerlernabschnittsdaten abschnitte ON schueler.ID = abschnitte.schueler_ID
  GROUP_CONCAT ( abschnitte )
  WHERE schueler.Klasse IN (?) ORDER BY Name ASC`,
    // GROUP BY abschnitte.schueler_ID
  // select eigeneschule_fachklassen.* from eigeneschule_fachklassen where eigeneschule_fachklassen.ID in (?)
// 'SELECT `schueler`.* FROM `schueler` WHERE `schueler`.`Klasse` IN (?) ORDER BY `Name` ASC',
    // nestTables: true,
    values: ['B17B2']},
    // values: [schueler.map(s => s.ID)]},
    (e, res) => {
      // s = res.map(r=>({ ...r.schueler, fachklasse: r.fachklasse, abschnitte: r.abschnitte }))
      console.log(e,s,res)
    })
</script>