<pre class="big">
Hallo {schueler[0].Vorname},

Ihr Benutzername: {schueler[0].prefix}{schueler[0].ID}
Ihr Passwort: {h(schueler[0])}

Verwenden Sie für Ihren persönlichen Zugang {privat.meinbk}

Grüße
</pre>
<script>
  import Hashids from 'hashids'
    import { updater } from './helfer';
  export let schueler, privat
  schueler = updater(schueler, privat);
  if (!privat.paedml_salt) throw 'Kein Salt'
  const hashids = new Hashids(privat.paedml_salt, 8, 'abcdefghkmnpqrstuvwxyz23456789')
  const h = (s) => hashids.encode((s.prefix === 'b' ? 1:2) + s.ID)
</script>
<style>
  .big {
    font-style:unset;
    font-size: 2rem;
    margin: 5rem;
  }
</style>