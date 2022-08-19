<script>
  let file;
  let entries = [];
  let output = "";
  let download = "";
  const onFileSelected = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      const text = e.target.result;
      const data = text.split("\n\n");
      data.forEach((d) => {
        const e = d.split("\n");
        const n = {};
        e.forEach((ee) => {
          if (ee.length) {
            const [a, b, c] = ee.match(/(.+):\s+(.+)/);
            n[b] = c;
          }
        });
        entries = [...entries, n];
      });
      console.log(entries);
      entries.forEach((e) => {
        output = output.concat(
          `
BEGIN:VCARD
VERSION:3.0
N:${e.sn || ""};${e.givenname || ""};;;
FN:${e.displayname || ""}
TITLE:${e.title || ""}
NICKNAME:${e.givenName || ""}
EMAIL;type=INTERNET:${e.mail || ""}
TEL;type=WORK;type=VOICE:${e.telephonenumber || ""}
tel;type=cell:${e.mobile || ""}
tel;type=home:${e.homePhone || ""}
tel;type=fax:${e.facsimileTelephoneNumber || ""}
adr;type=work,postal,parcel:${e.postalAddress || ""};${e.l || ""};${
            e.st || ""
          };${e.postalCode || ""};
adr;type=home,postal,parcel:${e.homePostalAddress || ""};
item1.URL;type=pref:${e.url || ""}
NOTE:${e.description || ""}
END:VCARD
			
`
        );
      });
      download = `data:text/plain;charset=utf-8,${encodeURIComponent(output)}`;
    };
  };
</script>

<h1>LDIF-Kontakdatei hochladen</h1>

{#if entries.length}
  <pre>{entries.length} Kontakte gefunden.</pre>
  <a href={download} download="Export-KBK.vcf"
    >Adressen im VCard-Format herunterladen</a
  >
{/if}
<p />
<input type="file" accept=".ldif" on:change={onFileSelected} bind:this={file} />

<style>
</style>
