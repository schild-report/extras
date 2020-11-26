<input bind:value="{path}" placeholder="Pfad angeben">
=> <b>{res}</b>
<script>
  export let schueler, jahr, abschnitt
  let path = ''
  const aktHalbjahr = (a) => a.Jahr === jahr && a.Abschnitt === abschnitt
  let hj = schueler[0].abschnitte.find(aktHalbjahr)
  let res = ''
  $: try {res = eval(path) || ''} catch (e) { res = 'unbekannt'}
</script>