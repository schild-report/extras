{#each abifaecher as fach}
    <div class="page grid" orientation="portrait" size="A4" style="font-size: 1.0rem">
      <div class="header">
        <Titelkopf titel="Abifächer"/>
      </div>
      <div class="main">
        <Voffset v="0.5"/>
        <h1>Ergebnisse im Fach {fach.name}</h1>
        <table class="sz-data-table">
          <tr>
            <th rowspan="2">Nr</th><th rowspan="2">Name</th>
            <th rowspan="2">12.1</th><th rowspan="2">12.2</th><th rowspan="2">13.1</th><th rowspan="2">13.2</th><th rowspan="2">Schnitt</th><th colspan="3">Abitur</th>
          </tr>
          <tr>
            <th>Schriftlich</th><th>Mündlich (Anlass)</th><th>Ergebnis</th>
          </tr>
          {#each fach.schueler as s, i}
          <tr>
            <td>{i+1}</td><td>{s.name}</td>
            <td>{s["12.1"]}</td><td>{s["12.2"]}</td><td>{s["13.1"]}</td><td>{s["13.2"]}</td><td>{s.schnitt || ""}</td>
            <td>{s.schriftlich || ""}</td><td>{s.muendlich || ""} ({s.anlass_muendlich})</td><td>{s.note || ""}</td>
          </tr>
          {/each}
        </table>
    </div>
    <div class="flex-grid">
      <div class="col" style="margin: 0 1rem;">
          &nbsp;
          <hr />
          Ort, Datum
      </div>
      <div class="col" style="margin: 0 1rem;">
        &nbsp;
        <hr />
        Unterschrift Erstprüfer:in
      </div>
      <div class="col" style="margin: 0 1rem;">
        &nbsp;
        <hr />
        Unterschrift Zweitprüfer:in
      </div>
    </div>

  </div>
{/each}

<script>
  import Titelkopf from './partials/Titelkopf.svelte'
  import Voffset from './partials/Voffset.svelte'
  
  export let auswahl

  let abifaecher = []

  function buildArrays()  {
    console.log("hier")
    let temp = { }
    auswahl.schueler.forEach(s => {
      s.abi_abschluss_faecher.forEach(fach => {
        if(fach.AbiFach) {
          if(!temp[fach.FachKrz]) {
            temp[fach.FachKrz] = { "name": fach.fach.Zeugnisbez, "schueler" : [] }
          }
          temp[fach.FachKrz].schueler.push({ "name": s.Name+", "+s.Vorname, 
                                              "12.1": fach.P12_1, 
                                              "12.2": fach.P12_2,
                                              "13.1": fach.P13_1,
                                              "13.2": fach.P13_2,
                                              "schnitt": fach.Durchschnitt,
                                              "zulassung": fach.Zulassung,
                                              "schriftlich": fach.AbiPruefErgebnis,
                                              "zwischenstand": fach.Zwischenstand,
                                              "anlass_muendlich": fach.MdlPflichtPruefung=='+' ? "Pflicht" : (fach.MdlBestPruefung ? "Bestehen" : ""),
                                              "muendlich": fach.MdlPruefErgebnis,
                                              "prueffolge": fach.MdlPruefFolge,
                                              "note": fach.AbiErgebnis 
                                            })
  
          }
        }
      )
    });
    for(let f in temp){    
      abifaecher.push(temp[f])
    }
  }
  buildArrays()
</script>

<style>
  	@import 'css/main.css';
</style>
