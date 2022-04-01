{#each schueler as s}
  <pre>{s.Name},{s.Vorname},{s.EMail}</pre>
  <!-- <pre>{s.Name}, {s.Vorname}: {note(s)}</pre> -->
{/each}

<script>
  export let schueler, jahr, abschnitt
  const aktHalbjahr = (a) =>  a.Jahr === jahr && a.Abschnitt === abschnitt
  function note (s) {
    const hj = s.abschnitte.find(aktHalbjahr)
    console.log(hj.noten)
    return hj.noten.find(n => n.Fach_ID === 130).NotenKrz
  }
</script>