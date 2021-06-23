<script>
  const mysql = R("mysql");
  const _ = R("lodash");
  import { bg } from "./helfer";
  export let knexConfig, gruppe;
  const mysql_connection = mysql.createConnection(knexConfig.connection);
  mysql_connection.connect();
  mysql_connection.query(
    `SELECT Klasse, Entlassart
                          FROM schueler
                          WHERE Status = 8 AND AktSchuljahr = 2019 AND Geloescht = "-" AND Gesperrt = "-"
                          ORDER BY Klasse, Entlassart ASC`,
    (e, res) => {
      console.log(e);
      gruppe = res;
    }
  );

  const abschluesse = {
    "3G": "Berufsschulabschluss und Mittlerer Schulabschluss (Fachoberschulreife mit Berechtigung zum Besuch der gymnasialen Oberstufe)",
    "4J": "Berufliche Kenntnisse, Fähigkeiten und Fertigkeiten und Fachhochschulreife",
    "4H": "Berufliche Kenntnisse, Fähigkeiten und Fertigkeiten und Fachhochschulreife (schulischer Teil)",
    "8D": "Vertiefte berufliche Kenntnisse, Fähigkeiten und Fertigkeiten und ein dem Hauptschulabschluss nach Klasse 10 gleichwertiger Abschluss (für G8 Schüler)",
    "8G": "Vertiefte berufliche Kenntnisse, Fähigkeiten und Fertigkeiten und Mittlerer Schulabschluss nach Klasse 11 (für G8 Schüler)",
    "1B": "Abschlusszeugnis (berufliche Kenntnisse, Fähigkeiten und Fertigkeiten) und ein dem Hauptschulabschluss gleichwertiger Abschluss",
    "1S": "Abschlusszeugnis und ein dem Hauptschulabschluss gleichwertiger Abschluss, ggfs. Berechtigung zum Besuch eines weiterführenden Bildungsgangs im Berufskolleg (nur für Internationale  Förderklassen)",
    "0D": "Hauptschulabschluss nach Klasse 10",
    M: "Abschlusszeugnis der Förderschule, Förderschwerpunkt geistige Entwicklung",
    "0D": "Ein dem Hauptschulabschluss nach Klasse 10 gleichwertiger Abschluss",
    "0F": "Mittlerer Schulabschluss (Fachoberschulreife ohne Qualifikationsvermerk)",
    "5A": "Berufsabschluss (für Schüler, die bereits die Qualifikation des Hauptschulabschlusses der Klasse 10 oder einen höheren Abschluss erreicht hatten)",
    "5D": "Berufsabschluss und Hauptschulabschluss nach Klasse 10",
    "5F": "Berufsabschluss und Mittlerer Schulabschluss (Fachoberschulreife ohne Qualifikationsvermerk)",
    "5G": "Berufsabschluss und Mittlerer Schulabschluss (Fachoberschulreife mit Qualifikationsvermerk)",
    "5J": "Berufsabschluss und Fachhochschulreife",
    "0A": "Ohne Abschluss",
    "9A": "Schulwechsler, die im selben Bildungsgang verbleiben",
    "4D": "berufliche Kenntnisse, Fähigkeiten und Fertigkeiten und ein dem Hauptschulabschluss nach Klasse 10 gleichwertiger Abschluss",
    "0F": "Mittlerer Schulabschluss (Fachoberschulreife ohne Berechtigung zum Besuch der gymnasialen Oberstufe)",
    "4F": "Berufliche Kenntnisse, Fähigkeiten und Fertigkeiten und Mittlerer Schulabschluss (Fachoberschulreife ohne Berechtigung zum Besuch der gymnasialen Oberstufe)",
    "4G": "Berufliche Kenntnisse, Fähigkeiten und Fertigkeiten und Mittlerer Schulabschluss (Fachoberschulreife mit Berechtigung zum Besuch der gymnasialen Oberstufe)",
    "0F": "Mittlerer Schulabschluss (Fachoberschulreife ohneBerechtigung zum Besuch der gymnasialen Oberstufe)",
    "0D": "Ein dem Hauptschulabschluss nach Klasse 10 gleichwertiger Abschluss (für G8 Schüler)",
    "5D": "Berufsabschluss und Hautschulabschluss nach Klasse 10",
    "5D": "Berufsabschluss und ein dem Hauptschulabschluss nach Klasse 10 gleichwertiger Abschluss",
    "5F": "Berufsabschluss und Mittlerer Schulabschluss (Fachoberschulreife ohne Berechtigung zum Besuch der gymnasialen Oberstufe)",
    "5A": "Berufsabschluss",
    "5G": "Berufsabschluss und Mittlerer Schulabschluss (Fachoberschulreife mit Berechtigung zum Besuch der gymnasialen Oberstufe)",
    A: "Ohne Abschluss",
    A: "Ohne Abschluss (zehnjährige Vollzeitschulpflicht erfüllt)",
    B: "Hauptschulabschluss",
    G: "Mittlerer Schulabschluss - Fachoberschulreife mit Berechtigung zum Besuch der gymnasialen Oberstufe",
    F: "Mittlerer Schulabschluss - Fachoberschulreife ohne Berechtigung zum Besuch der gymnasialen Oberstufe",
    D: "Hauptschulabschluss nach Klasse 10",
    V: "Abschlusszeugnis des Bildungsganges im Förderschwerpunkt Lernen",
    "5G": "Berufsabschluss und Mittlerer Schulabschluss - Fachoberschulreife mit Berechtigung zum Besuch der gymnasialen Oberstufe (nur Hiberniaschule)",
    "5J": "Berufsabschluss und Fachhochschulreife (nur Hiberniaschule)",
    A: "Ohne Abschluss (zehnjährige Vollzeitschulpflicht erfüllt) (Nur sachgerecht bei Nichtversetzung. Mit Versetzung in den Jg. 10 wird gem. § 40 APO-SI der Hauptschulabschluss erworben)",
    B: "Hauptschulabschluss (ohne Berechtigung zum Besuch der Klasse 10, Typ B) (zehnjährige Vollzeitschulpflicht erfüllt)",
    "3B": "Berufsschulabschluss und Hauptschulabschluss nach Klasse 9 oder ein dem Hauptschulabschluss gleichwertiger Abschluss",
    "0G": "Mittlerer Schulabschluss (Fachoberschulreife mit Berechtigung zum Besuch der gymnasialen Oberstufe)",
    "0G": "Mittlerer Schulabschluss nach Klasse 11 (für G8 Schüler)",
    "0G": "Mittlerer Schulabschluss (Fachoberschulreife mit Qualifikationsvermerk)",
    C: "Hauptschulabschluss (mit Berechtigung zum Besuch der Klasse 10, Typ B) (zehnjährige Vollzeitschulpflicht erfüllt)",
    "0H": "Fachhochschulreife (schulischer Teil)",
    "5A": "Berufsabschluss (für Schüler, die bereits die Qualifikation des Hauptschulabschlusses nach Klasse 10 oder einen höheren Abschluss erreicht hatten)",
    B: "Hauptschulabschluss nach Klasse 9 vergleichbarer Abschluss (ohne Berechtigung zum Besuch der Klasse 10 bzw. der gymnasialen Oberstufe; § 40 Abs. 4 S. 3 i.V.m. § 22 Abs. 1 u. § 25 Abs. 1 u. 2 APO-SI)",
    C: "Hauptschulabschluss nach Klasse 9 vergleichbarer Abschluss (mit Berechtigung zum Besuch der Klasse 10, Typ B) (nur G9 Bildungsgänge; mit Versetzung)",
    C: "Hauptschulabschluss nach Klasse 9 vergleichbarer Abschluss (mit Berechtigung zum Besuch der Klasse 10, Typ B) (ohne weiteren Abschluss in Klasse 10)",
    D: "Hauptschulabschluss nach Klasse 10 (§ 41 Abs. 2 APO-SI)",
    F: "Mittlerer Schulabschluss (Fachoberschulreife) (ohne Versetzungsvermerk)",
    G: "Mittlerer Schulabschluss (Fachoberschulreife) (mit Versetzungsvermerk)",
    B: "Hauptschulabschluss (ohne Berechtigung zum Besuch der Klasse 10, Typ B)",
    C: "Hauptschulabschluss (mit Berechtigung zum Besuch der Klasse 10, Typ B) (ohne weiteren Abschluss im Jahrgang 10)",
    "3D": "Berufsschulabschluss und Hauptschulabschluss nach Klasse 10 oder ein dem Hauptschulabschluss nach Klasse 10 gleichwertiger Abschluss",
    "3F": "Berufsschulabschluss und Mittlerer Schulabschluss (Fachoberschulreife ohne Berechtigung zum Besuch der gymnasialen Oberstufe)",
    "2G": "Berufsgrundbildung und Mittlerer Schulabschluss (Fachoberschulreife mit Qualifikationsvermerk)",
    "4K": "Berufliche Kenntnisse, Fähigkeiten und Fertigkeiten und Allgemeine Hochschulreife",
    "1P": "Versetzungszeugnis der Klasse 11 FO",
    "6A": "Fachschulabschluss",
    "6J": "Fachschulabschluss und Fachhochschulreife",
    "6F": "Fachschulabschluss und Mittlerer Schulabschluss",
    G: "Mittlerer Schulabschluss - Fachoberschulreife mit Berechtigung zum Besuch der gymnasialen Oberstufe (mit Versetzungsvermerk)",
    H: "Fachhochschulreife (schulischer Teil)",
    K: "Abitur (allgemeine Hochschulreife)",
    C: "Hauptschulabschluss (mit Berechtigung zum Besuch der Klasse 10, Typ) (zehnjährige Vollzeitschulpflicht erfüllt)",
    C: "Hauptschulabschluss (mit Berechtigung zum Besuch der Klasse 10, Typ)",
    V: "Abschlusszeugnis des Bildungsgangs im Förderschwerpunkt Lernen",
    C: "Hauptschulabschluss (mit Berechtigung zum Besuch der Klasse 10, Typ B)",
    B: "Hauptschulabschluss (ohne Berechtigung zum Besuch der Klasse 10, Typ B) (nur G9 Bildungsgänge mit dem Förderschwerpunkt Lernen)",
    G: "Mittlerer Schulabschluss - Fachoberschulreife mit Berechtigung zum Besuch der gymnasialen Oberstufe (ohne Versetzungsvermerk)",
    I: "Mittlerer Schulabschluss - Fachoberschulreife mit Berechtigung zum Besuch der Qualifikationsphase 1 (mit Versetzungsvermerk)",
    I: "Mittlerer Schulabschluss - Fachoberschulreife mit Berechtigung zum Besuch der Qualifikationsphase 1 (ohne Fachhochschulreife)",
    I: "Mittlerer Schulabschluss - Fachoberschulreife mit Berechtigung zum Besuch der Qualifikationsphase 1 (ohne Abitur und ohne Fachhochschulreife)",
    H: "Fachhochschulreife (schulischer Teil) (ohne Abitur)",
    W: "Zeugnis der Waldorfschule",
    K: "Abitur (allgemeine Hochschulreife) (ohne Berufsabschluss) (nur Hiberniakolleg)",
    "5K": "Berufsabschluss und Abitur (allgemeine Hochschulreife) (nur Hiberniakolleg)",
    "5F": "Berufsabschluss und Mittlerer Schulabschluss - Fachoberschulreife ohne Berechtigung zum Besuch der gymnasialen Oberstufe (nur Hiberniaschule)",
    "3J": "Berufsschulabschluss und Fachhochschulreife",
    "5K": "Berufsabschluss und Allgemeine Hochschulreife",
    "0K": "Allgemeine Hochschulreife",
    F: "Mittlerer Schulabschluss - Fachoberschulreife ohne Berechtigung zum Besuch der gymnasialen Oberstufe (ohne Versetzungsvermerk)",
    J: "Fachhochschulreife (nur für Studierende, die bereits den berufsbezogenen Teil der Fachhochschulreife erworben haben)",
    "8J": "Vertiefte berufliche Kenntnisse, Fähigkeiten und Fertigkeiten und Fachhochschulreife",
    "8Q": "Vertiefte berufliche Kenntnisse, Fähigkeiten und Fertigkeiten und fachgebundene Hochschulreife",
    "3A": "Berufsschulabschluss (für Schülerinnen und Schüler, die während der Berufsausbildung über ihre Eingangsqualifikation hinaus keinen höherwertigen allgemeinbildenden Abschluss erwerben)",
    "8K": "Vertiefte berufliche Kenntnisse, Fähigkeiten und Fertigkeiten und Allgemeine Hochschulreife",
    "2F": "Berufsgrundbildung und Mittlerer Schulabschluss (Fachoberschulreife ohne Qualifikationsvermerk)",
    "6F": "Fachschulabschluss und MittlererSchulabschluss",
    "5A": "Nur Berufsabschluss (nur Hiberniaschule)",
    G: "Mittlerer Schulabschluss (Fachoberschulreife) (mit Berechtigung zum Besuch der gymnasialen Oberstufe bzw. ohne Versetzungsvermerk; § 40 Abs. 2 APO-GOSt)",
    G: "Mittlerer Schulabschluss - Fachoberschulreife mit Berechtigung zum Besuch der gymnasialen Oberstufe (Einführungsphase)",
    I: "Mittlerer Schulabschluss - Fachoberschulreife mit Berechtigung zum Besuch der Qualifikationsphase 1",
    O: "Hauptschulabschluss nach Klasse 9 (Nur G8, mit Berechtigung zum Besuch der gymnasialen Oberstufe; § 43 Abs. 3 i.V.m. § 40 Abs. 4 S. 2 APO-SI)",
    V: "Abschlusszeugnis des Bildungsgangs im Förderschwerpunkt Lernen (nur in G8 Bildungsgängen)",
    H: "Fachhochschulreife (schulischer Teil) (§ 40a APO-GOSt)",
    B: "Hauptschulabschluss (ohne Berechtigung zum Besuch der Klasse 10, Typ B) (nur G8 Bildungsgänge mit Förderschwerpunkt Lernen)",
    A: "Ohne Abschluss (nur für kürzlich zugewanderte Seiteneinsteiger, die nicht aus JG9 versetzt wurden)",
    "4D": "Berufliche Kenntnisse, Fähigkeiten und Fertigkeiten und ein dem Hauptschulabschluss nach Klasse 10 gleichwertiger Abschluss (für G8 Schüler)",
    "4G": "Berufliche Kenntnisse, Fähigkeiten und Fertigkeiten und Mittlerer Schulabschluss nach Klasse 11 (für G8 Schüler)",
    "1G": "Versetzungszeugnis der Klasse 11 FO und Mittlerer Schulabschluss nach Klasse 11 (für G8 Schüler)",
    B: "Hauptschulabschluss (ohne Berechtigung zum Besuch der Klasse 10, Typ B) (ohne weiteren Abschluss im Jahrgang 10)",
    F: "Mittlerer Schulabschluss (Fachoberschulreife) ohne Berechtigung zum Besuch der gymnasialen Oberstufe",
    G: "Mittlerer Schulabschluss (Fachoberschulreife) mit Berechtigung zum Besuch der gymnasialen Oberstufe (Einführungsphase)",
    I: "Mittlerer Schulabschluss (Fachoberschulreife) mit Berechtigung zum Besuch der Qualifikationsphase 1",
    G: "Mittlerer Schulabschluss - Fachoberschulreife mit Berechtigung zum Besuch der gymnasialen Oberstufe (nur Hiberniakolleg)",
    H: "Fachhochschulreife (schulischer Teil) (nur Hiberniakolleg)",
    I: "Mittlerer Schulabschluss (Fachoberschulreife) (mit Berechtigung zum Besuch der Qualifikationsphase I bzw. mit Versetzungsvermerk; § 40 Abs. 2 APO-GOSt)",
    I: "Mittlerer Schulabschluss (Fachoberschulreife) (mit Berechtigung zum Besuch der Qualifikationsphase I bzw. Zuerkennung bei Abwesenheit in EF, z.B. bei Auslandsjahr)",
    I: "Mittlerer Schulabschluss (Fachoberschulreife)",
    O: "Hauptschulabschluss nach Klasse 9 vergleichbarer Abschluss (mit Berechtigung zum Besuch der gymnasialen Oberstufe; § 43 Abs. 3 i.V.m. § 40 Abs. 4 S. 2 APO-SI) (nur G8 Bildungsgänge)",
    O: "Hauptschulabschluss nach Klasse 9 (mit Berechtigung zum Besuch der gymnasialen Oberstufe; § 43 Abs. 3 i.V.m. § 40 Abs. 4 S. 2 APO-SI) (ohne weiteren Abschluss im Jahrgang EF)",
    U: "Hauptschulabschluss nach Klasse 10 (mit Berechtigung zum Besuch der gymnasialen Oberstufe; § 41 Abs. 2 APO-SI i.V.m. § 40 Abs. 2 APO-GOSt)",
    B: "Hauptschulabschluss (ohne Berechtigung zum Besuch der Klasse 10, Typ B) (nur G8 Bildungsgänge mit dem Förderschwerpunkt Lernen)",
    "1A": "Abschlusszeugnis",
    "1S": "Abschlusszeugnis und ein dem Hauptschulabschluss gleichwertiger Abschluss, ggfs. Berechtigung zum Besuch eines weiterführenden Bildungsgangs im Berufskolleg  (nur für Internationale  Förderklassen)",
    A: "Ohne Abschluss (nur für kürzlich zugewanderte Seiteneinsteiger, die nicht aus JG9 vesetzt wurden)",
    C: "Hauptschulabschluss (mit Berechtigung zum Besuch der Klasse 10, Typ B) (Nur G9, zehnjährige Vollzeitschulpflicht erfüllt)",
    O: "Hauptschulabschluss nach Klasse 9 (mit Berechtigung zum Besuch der gymnasialen Oberstufe; § 43 Abs. 3 i.V.m. § 40 Abs. 4 S. 2 APO-SI) (ohne weiteren Abschluss in EF)",
    I: "Mittlerer Schulabschluss (Fachoberschulreife) (mit Berechtigung zum Besuch der Qualifikationsphase I bzw. Zuerkennung bei Abwesenheit in EF,z.B. bei Auslandsjahr)",
    I: "Mittlerer Schulabschluss (Fachoberschulreife) mit Berechtigung zum Besuch der Qualifikationsphase I",
  };
</script>

{#if gruppe}
  {#each Object.entries(_.groupBy(gruppe, "Klasse")) as [klasse, schueler]}
    <b>{klasse}</b>
    {#each Object.entries(_.groupBy(schueler, "Entlassart")) as [Entlassart, s]}
      <br />{abschluesse[Entlassart]}: {s.length}
    {/each}
    <br />
    <br />
  {/each}
{/if}
