<template>
  <q-page class="row items-center justify-evenly">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center">FILE {{ type }}</div>
        <img v-if="image !== '' && type === 'image/jpeg'" :src="image" />
        <img v-if="image !== '' && type === 'image/png'" :src="image" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import electron from 'electron'

@Component({})
export default class PageOpenFile extends Vue {
    type = ''
    image = ""

    fileReceived(event: Event, data: ArrayBuffer, type: string) {
        this.type = type
        const blob = new Blob( [ data ], { type } );
        const objectURL = URL.createObjectURL(blob)
        console.log(objectURL)
        this.image = objectURL
    }
    
    mounted() {
        electron.ipcRenderer.once('openfile', this.fileReceived)
        electron.ipcRenderer.send('getfile')
    }
}
</script>
