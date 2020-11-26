{#each schueler as s}
  <pre>{s.Name},{s.Vorname}</pre>
{/each}

<script>
  export let schueler, jahr, abschnitt
</script>