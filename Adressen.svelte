{#each schueler as s}
  <pre>
{s.anrede} {s.Vorname} {s.Name}
{s.Strasse}
{s.PLZ} {s.OrtAbk}
  </pre>
{/each}

<script>
  import {datum} from './helfer'
  export let schueler
</script>