<script>
import TitelKopf from "../Anschreiben/partials/TitelKopf.svelte";

  export const kommentar = `
[Anlage D § 21](https://bass.schul-welt.de/3129.htm#13-33nr1.1p21_AnlageD)
  `;
  import { datum } from "./../.js/helfer";

  import Titelkopf from './partials/Titelkopf.svelte'
  import Voffset from "./partials/Voffset.svelte";

  export let auswahl;
</script>

<style>
  @import "css/main.css";
  .table-bordered {
    border-collapse: collapse;
  }
  .table-bordered tr td {
    border: thin solid #ddd;
    line-height: 1.3rem;
  }
  .table-eng {
    margin-bottom: 0;
  }
  ul.boxes {
    list-style-type: none;
    padding-left: 1em;
  }
  ul.boxes li:before {
    content: "☐";
    position: absolute;
    margin-left: -1em;
  }
hr {
  position: relative;
  border-top: 1px dotted black;
  overflow: visible;
}
.hr-schere:before {
  content: "✂";
  font-size: 1.5rem;
  position: absolute;
  top: -17px;
  left: -20px;
}
</style>

{#each auswahl.schueler as s (s.ID)}
    <div class="page grid" orientation="portrait" size="A4">
      <div class="header">
        <Titelkopf titel="Abiturprüfung { s.gewaehltesJahr+1 }"/>
      </div>
      <div class="main">
        <b>
          Information über den Zwischenstand in der Abiturprüfung { s.gewaehltesJahr+1 }
        </b>
        <br />
        Informationen gemäß VV 21.1 f. zu § 21 APO-BK, Anlage D
        <Voffset v="0.5" />
        <br />
        {s.anrede}
        <b>{s.Vorname} {s.Zusatz || ''} {s.Name}</b>
        <table class="table table-bordered table-eng" style="font-size: 0.8rem">
          <tr>
            <td rowspan="2" colspan="5" />
            <td colspan="3" class="text-center">APO-BK, Anlage D</td>
          </tr>
          <tr>
            <td class="text-center">§ 21.1</td>
            <td class="text-center">§ 21.2</td>
            <td class="text-center">§§ 21.5 f</td>
          </tr>
          <tr>
            <td class="text-center" width="40px">Abitur- fach</td>
            <td class="text-center">Fach</td>
            <td class="text-center">Punkte Durchschnitt</td>
            <td class="text-center">Punkte Prüfung</td>
            <td class="text-center">Zwischenstand der Punktewertung</td>
            <td class="text-center">Mündliche Abweichungs- prüfung</td>
            <td class="text-center">Mündliche Bestehens- prüfung</td>
            <td class="text-center">Mündliche Prüfung freiwillig</td>
          </tr>
          {#each s.abi_abschluss_faecher
            .filter(a => a.AbiFach)
            .sort((a, b) => a.AbiFach - b.AbiFach) as f}
            <tr>
              <td class="text-center">{f.AbiFach}</td>
              <td>{f.fach.Bezeichnung}</td>
              <td class="text-center">
                {f.Durchschnitt ? f.Durchschnitt.toFixed(2) : '–'}
              </td>
              <td class="text-center">{f.AbiPruefErgebnis}</td>
              <td class="text-center">{f.Zwischenstand}</td>
              <td class="text-center">{f.MdlPflichtPruefung === "+" ? "X" : ""}</td>
              <td class="text-center">{f.MdlBestPruefung === "+" ? "X" : ""}</td>
              <td class="text-center">{f.MdlFreiwPruefung === "+" ? "X" : ""}</td>
            </tr>
          {/each}
          <tr>
            <td colspan="4">Zwischenstand der Punktwertung im Abiturbereich</td>
            <td class="text-center">{s.abi_abschluss.Punktsumme_II}</td>
          </tr>
          <tr>
            <td colspan="4">Gesamtpunktzahl aus Block I</td>
            <td class="text-center">{s.abi_abschluss.Punktsumme_I}</td>
            <td class="text-center">Notensprung bei</td>
          </tr>
          <tr>
            <td colspan="4">Vorläufige Punktzahl der Gesamtqualifikation</td>
            <td class="text-center">{s.abi_abschluss.GesamtPunktzahl}</td>
            <td class="text-center">{s.abi_abschluss.Notensprung}</td>
          </tr>
          <tr>
            <td colspan="4">Vorläufige Durchschnittsnote</td>
            <td class="text-center">{s.abi_abschluss.Note}</td>
          </tr>
        </table>
        <Voffset v="1" />
        Mündliche Prüfungen im 1. bis 3. Abiturfach (angesetzte oder
        freiwillige) führen zu Änderungen der oben genannten vorläufigen
        Ergebnisse. Bei mehreren mündlichen Prüfungen müssen Sie selbst die
        Reihenfolge dieser Prüfungen festlegen.
        <Voffset v="1" />
        Abgabe der Meldung zu mündlichen Prüfungen bis zum
        <b>16.06.2019, 10:00 Uhr</b>
        im Sekretariat.
        <Voffset v="1" />
        <div class="flex-grid">
          <div class="col">{auswahl.schule.Ort}, den {datum(s.gewaehlterAbschnitt.Konferenzdatum)}</div>
          <div class="col text-center klein">
            <Voffset v="3" />
            <hr />
            {auswahl.schule.SchulleiterVorname} {auswahl.schule.SchulleiterName}
            <br />
            Vorsitzende des allgemeinen Prüfungsausschusses
          </div>
        </div>
      </div>
      <div class="footer">
        <hr class="hr-schere">
        <br />
        {s.anrede}
        <b>
          {s.Vorname} {s.Zusatz || ''} {s.Name} – Mündliche Abiturprüfung { s.gewaehltesJahr+1 }
        </b>
        <ul class="boxes">
          <li>
            Hiermit beantrage ich eine mündliche Prüfung in dem Fach/den Fächern
            in der folgenden Reihenfolge:
          </li>
          <li>
            Hiermit nehme ich meine angesetzten Prüfungen zur Kenntnis und lege
            (bei mehreren Prüfungen) die Reihenfolge meiner Abweichungs-
            und/oder Bestehensprüfung fest:
          </li>
        </ul>
        <Voffset v="0.5" />
        (Zutreffendes bitte ankreuzen)
        <Voffset v="1" />
        <div class="flex-grid">
          <div class="col">
            1. Fach
            <hr />
          </div>
          <div class="col" style="margin: 0 1rem;">
            2. Fach
            <hr />
          </div>
          <div class="col">
            3. Fach
            <hr />
          </div>
        </div>
        <Voffset v="1.5" />
        Mir ist bekannt, dass die Prüfungsleistung bei Nichtantritt ohne Vorlage
        eines ärztlichen Attests mit ungenügend bewertet wird.
        <Voffset v="2" />
        <div class="flex-grid">
          <div class="col" style="margin: 0 1rem;">
            &nbsp;
              <hr />
              Ort, Datum
            </div>
            <div class="col" style="margin: 0 1rem;">
          &nbsp;
            <hr />
            Unterschrift
          </div>
          <div class="col">
          </div>
        </div>
      </div>
    </div>
{/each}
