<pre class="big">
Hallo {schueler[0].Vorname},

Ihr Benutzername: b{schueler[0].ID}
Ihr Passwort: {h(schueler[0])}

Verwenden Sie für Ihren persönlichen Zugang {privat.meinbk}

Grüße
</pre>
<script>
  import Hashids from 'hashids'
  export let schueler, privat
  if (!privat.paedml_salt) throw 'Kein Salt'
  const prefix = (s) => String(s.SchulnrEigner) === String(privat.schulnummer) ? "b":"k"
  const hashids = new Hashids(privat.paedml_salt, 8, 'abcdefghkmnpqrstuvwxyz23456789')
  const h = (s) => hashids.encode((prefix(s) === 'b' ? 1:2 )+ s.ID)
</script>
<style>
  .big {
    font-style:unset;
    font-size: 2rem;
    margin: 5rem;
  }
</style>