<script>
  export let schueler, jahr, abschnitt, klasse;
</script>

<h2>Klassenliste der {klasse.Klasse} für {jahr}, {abschnitt}. Halbjahr</h2>
<table border="1">
  {#each schueler as s}
    <tr>
      <td>{s.Name}</td><td>{s.Vorname}</td><td>{s.Telefon}</td><td
        >{s.EMail || ""}</td
      >
    </tr>
  {/each}
</table>
