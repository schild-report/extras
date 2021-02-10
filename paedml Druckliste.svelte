<pre class="big">
Hallo {schueler[0].Vorname},

Ihr Benutzername: b{schueler[0].ID}
Ihr Passwort: {h(schueler[0].ID)}

Verwenden Sie für Ihren persönlichen Zugang {privat.meinbk}

Grüße
</pre>
<script>
  import Hashids from 'hashids'
  export let schueler, privat
  if (!privat.paedml_salt) throw 'Kein Salt'
  const hashids = new Hashids(privat.paedml_salt, 8, 'abcdefghkmnpqrstuvwxyz23456789')
  const h = (id) => hashids.encode(id)
</script>
<style>
  .big {
    font-style:unset;
    font-size: 2rem;
    margin: 5rem;
  }
</style>