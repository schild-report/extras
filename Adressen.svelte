{#each schueler as s}
  <pre>
{s.anrede} {s.Vorname} {s.Name}
{s.Strasse}
{s.PLZ} {s.OrtAbk}
  </pre>
{/each}

<script>
  export let schueler
</script>