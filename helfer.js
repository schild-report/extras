const noten = [null, 'sehr gut', 'gut', 'befriedigend', 'ausreichend', 'mangelhaft', 'ungenügend']
const enoten = { 'E1': 'mit besonderem Erfolg teilgenommen', 'E2': 'mit Erfolg teilgenommen', 'E3': 'teilgenommen' }
const punkte = {
  15: '1+', 14: '1', 13: '1-',
  12: '2+', 11: '2', 10: '2-',
   9: '3+',  8: '3',  7: '3-',
   6: '4+',  5: '4',  4: '4-',
   3: '5+',  2: '5',  1: '5-',
             0: '6' }
const zahlwort = { 1: "eins",2: "zwei",3: "drei",4: "vier",5: "fünf",6: "sechs",7: "sieben",8: "acht",9: "neun",0: "null" }

// Verzichten wir auf teure lodash-Funktionen:
export const groupBy = (arr, id) => arr.reduce(
  (entryMap, f) => {
    const fx = id.split('.').reduce((p,c)=>p&&p[c]||null, f)
    return entryMap.set(fx, [...entryMap.get(fx)||[], f])
  },
  new Map()
)
export const chunk = (arr, size) => arr.reduce((chunks, el, i) => (i % size
    ? chunks[chunks.length - 1].push(el)
    : chunks.push([el])) && chunks, [])

export const datum = (t) => {
  // gibt ein Datum im deutschen Format zurück
  try {
    return new Date(t).toLocaleDateString('de', {day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Europe/Berlin'})
  } catch (e) {console.log(e); return}
}
export const bemerkungen = (hj) => hj.ZeugnisBem ? hj.ZeugnisBem.replace('\r\n', '<br/>') : 'keine'
export const volljaehrigBei = (s, datum) => {
  // gibt an, ob der Schüler *s* zu einem Zeitpunkt *datum* volljährig war
  try {
  const g = new Date(s.Geburtsdatum)
  const d = new Date(datum)
  const volljaehrig = d.getFullYear() - g.getFullYear() - ((d.getMonth() > g.getMonth() || (d.getMonth() == g.getMonth() && d.getDay() >= g.getDay()) ? 0 : 1)) >= 18
  return volljaehrig
  } catch (e) {console.log(e); return}
}
export const note = (note) => noten[parseInt(note)] || enoten[note]
export const punkte2note = (p) => punkte[parseInt(p)]
export const noteInWorten = (n) => n.split('').map(n => n === ',' ? '/' : zahlwort[parseInt(n)]).join(' ')