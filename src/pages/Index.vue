<template>
  <q-page class="row items-center justify-evenly">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center">Wybierz plik</div>
      </q-card-section>

      <q-separator dark />

      <q-card-actions>
        <q-file label="Załaduj konfiguracje" @input="selectConfig" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import electron from 'electron'

@Component({})
export default class PageIndex extends Vue {
  async selectConfig(file: File) {
    const readFile = () => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file)
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

    const data = await readFile();
    electron.ipcRenderer.send("openfile", data, file.type)
  }
}
</script>
