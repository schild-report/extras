<script>
  import Papa from "papaparse";
  const _ = R("lodash");
  export let privat
  let vouchers = "",
    values;

  const update_vouchers = async () => {
    const res = await Papa.parse(vouchers, { comments: "#" });
    values = res.data.map((e) => e[0].trim());
  };
</script>

<style>
  @import "css/main.css";
  .page {
    padding: 0;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
  }
</style>

{#if values}
  {#each _.chunk(values, 9) as slice}
    <div
      class="page"
      orientation="portrait"
      size="A4"
      style="font-family: sans">
      <div class="grid">
        {#each slice as s}
          <div style="padding: 0 10px 0 10px;">
            <b>Zugangscode für {privat.wlan} des {privat.schulname}</b><br>
            Verbinden Sie sich mit dem WLAN und geben Sie den Zugangscode beim Anmeldebildschirm ein. Der Zugang ist für acht Stunden ab der ersten Eingabe gültig.

            <center><b style="font-size: xx-large; font-family: monospace;">{s}</b></center>
          </div>
          <hr />
        {/each}
      </div>
    </div>
  {/each}
{:else}
  <h3 class="title">Voucher austauschen</h3>
  <div class="field">
    <label class="label" for="ta">
      Voucher als Liste zeilenweise in das Textfeld einfügen. Alte Voucher
      werden entfernt und durch die neuen ersetzt.
    </label>
    <div class="control">
      <textarea
        class="textarea"
        id="ta"
        bind:value={vouchers}
        rows="10"
        cols="20" />
    </div>
  </div>
  <div class="field is-grouped">
    <div class="control">
      <button
        class="button is-link"
        on:click={() => update_vouchers()}>Aktualisieren</button>
    </div>
  </div>
{/if}
