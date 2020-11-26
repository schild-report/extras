{#await init()}
  Warten auf Schülerdaten…
{:then weiter}
  <button><a href={data} download={`Notenblaetter_${jahr}_${jahr-1999}.xlsx`}>Notenblätter für {`${jahr}/${jahr-1999}`} herunterladen</a></button>
{:catch e}{e}
{/await}
<style>
  button { margin:auto; display:block; margin: 100px; font-size: 4rem; }
</style>
<script>
  export let jahr, abschnitt, knexConfig
  let data, alleSchueler
  const mysql = R('mysql')
  const connection = mysql.createConnection(knexConfig.connection)
  import XlsxPopulate from './xp.js'
  import { groupBy } from './helfer.js'

  async function init () {
    // alle Schüler aus der DB holen
    const connection = mysql.createConnection(knexConfig.connection)
    connection.connect()
    connection.query(`SELECT ID, Name, Vorname, Klasse
                      FROM schueler
                      WHERE Status = 2 AND Geloescht = "-" AND Gesperrt = "-"
                      ORDER BY Klasse, Name ASC`,
      async (e, res) => {
        if (e) console.log(e)
        alleSchueler = res
    connection.end()
    const klassen = [...groupBy(alleSchueler, 'Klasse').entries()]
    console.log('HIER')
    // lade Vorlage mit genügend Tabellen. Tabellen können leider nicht dupliziert werden
    // und müssen min. soviele sein wie Klassen. Beachten!
    const res2 = await window.fetch('./Notenlisten.xlsx')
    const blob = await res2.blob()
    const workbook = await XlsxPopulate.fromDataAsync(blob)
    klassen.forEach(([klasse, schueler],i) => {
      const sheet = workbook.sheet(i)
      sheet.column("B").width(23)
      sheet.cell('A3').value(`Klasse: ${klasse}`)
      sheet.cell('C3').value(`1. Halbjahr ${jahr}/${jahr-1999}`).style({ bold: true, fontSize: 12 })
      sheet.cell('M3').value(`2. Halbjahr ${jahr}/${jahr-1999}`).style({ bold: true, fontSize: 12 })
      schueler.forEach((s,ii) => {
        sheet.cell(`A${9+ii}`).value(ii+1)
        sheet.cell(`B${9+ii}`).value(`${s.Name},\n  ${s.Vorname}`).style({ fontSize: 9 })
      })
      // lösche die verbleibenden Zeilen
      sheet._rows.splice(9 + schueler.length, 31 - schueler.length)
      sheet._rows.map((row, index) => {
        row._node.attributes.r = index
      })
      sheet.name(klasse)
    })
    // und die verbleibenden Tabellen
    const sheets = workbook.sheets()
    sheets.forEach(s => { if (s.name().startsWith('Tabelle')) s.delete() })
    // als dataurl im Button hinterlegen
    const base64 = await workbook.outputAsync("base64")
    data = "data:" + XlsxPopulate.MIME_TYPE + ";base64," + base64
  })}
</script>
