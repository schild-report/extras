<button><a href={data} download={`${klasse.Klasse}.xlsx`}>Notenblatt für {klasse.Klasse} herunterladen</a></button>
<style>
  button { margin:auto; display:block; margin: 100px; font-size: 4rem; }
</style>
<script>
  import XlsxPopulate from './xp.js'
  export let schueler, klasse, jahr, abschnitt
  let data

  async function writer () {
    const res = await window.fetch('./Notenlisten.xlsx')
    const blob = await res.blob()
    const workbook = await XlsxPopulate.fromDataAsync(blob)
    const sheet = workbook.sheet(0)
    sheet.name(klasse.Klasse)
    sheet.cell('A3').value(`Klasse: ${klasse.Klasse}`)
    sheet.cell('C3').value(`1. Halbjahr ${jahr}/${jahr-1999}`).style({ bold: true, fontSize: 12 })
    sheet.cell('M3').value(`2. Halbjahr ${jahr}/${jahr-1999}`).style({ bold: true, fontSize: 12 })
    schueler.forEach((s,i) => {
      sheet.cell(`A${9+i}`).value(i+1)
      sheet.cell(`B${9+i}`).value(`${s.Name},\n  ${s.Vorname}`).style({ fontSize: 9 })
    })
    // lösche die verbleibenden Zeilen
    sheet._rows.splice(9 + schueler.length, 31 - schueler.length)
    sheet._rows.map((row, index) => {
      row._node.attributes.r = index
    })
    // und die verbleibenden Tabellen
    const sheets = workbook.sheets()
    sheets.forEach(s => { if (s.name().startsWith('Tabelle')) s.delete() })
    const base64 = await workbook.outputAsync("base64")
    data = "data:" + XlsxPopulate.MIME_TYPE + ";base64," + base64
  }
  writer()
</script>