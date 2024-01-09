<template>
  <div
    class="drag"
    :class="{active}"
    @drop.prevent="(e) => onDrop(e.dataTransfer.files)"
    @dragenter.prevent="active = true"
    @dragover.prevent="active = true"
    @dragleave.prevent="active = false"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M25 26.5587V35.1445H23V23.1445H35V25.1445H26.4142L40.7071 39.4374L39.2929 40.8516L25 26.5587Z" fill="#FF8A00"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M38.8555 15.6445C38.8555 15.0922 38.4078 14.6445 37.8555 14.6445L15.8555 14.6445C15.3032 14.6445 14.8555 15.0922 14.8555 15.6445L14.8555 37.6445C14.8555 38.1968 15.3032 38.6445 15.8555 38.6445H25.8555C26.4078 38.6445 26.8555 39.0922 26.8555 39.6445C26.8555 40.1968 26.4078 40.6445 25.8555 40.6445H15.8555C14.1986 40.6445 12.8555 39.3014 12.8555 37.6445L12.8555 15.6445C12.8555 13.9877 14.1986 12.6445 15.8555 12.6445L37.8555 12.6445C39.5123 12.6445 40.8555 13.9877 40.8555 15.6445V25.6445C40.8555 26.1968 40.4078 26.6445 39.8555 26.6445C39.3032 26.6445 38.8555 26.1968 38.8555 25.6445V15.6445Z" fill="#FF8A00"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M25 0.144531C26.6569 0.144531 28 1.48768 28 3.14453V5.64453C28 6.19682 27.5523 6.64453 27 6.64453C26.4477 6.64453 26 6.19682 26 5.64453V3.14453C26 2.59225 25.5523 2.14453 25 2.14453H23.1667C22.6144 2.14453 22.1667 1.69682 22.1667 1.14453C22.1667 0.592246 22.6144 0.144531 23.1667 0.144531H25ZM27 9.64453C27.5523 9.64453 28 10.0922 28 10.6445V13.1445C28 13.6968 27.5523 14.1445 27 14.1445C26.4477 14.1445 26 13.6968 26 13.1445V10.6445C26 10.0922 26.4477 9.64453 27 9.64453ZM20.5 1.14453C20.5 1.69682 20.0523 2.14453 19.5 2.14453H15.8333C15.281 2.14453 14.8333 1.69682 14.8333 1.14453C14.8333 0.592246 15.281 0.144531 15.8333 0.144531H19.5C20.0523 0.144531 20.5 0.592246 20.5 1.14453ZM14 27.1445C14 27.6968 13.5523 28.1445 13 28.1445H10.5C9.94772 28.1445 9.5 27.6968 9.5 27.1445C9.5 26.5922 9.94772 26.1445 10.5 26.1445H13C13.5523 26.1445 14 26.5922 14 27.1445ZM13.1667 1.14453C13.1667 1.69682 12.719 2.14453 12.1667 2.14453H8.5C7.94772 2.14453 7.5 1.69682 7.5 1.14453C7.5 0.592246 7.94772 0.144531 8.5 0.144531H12.1667C12.719 0.144531 13.1667 0.592246 13.1667 1.14453ZM6.5 27.1445C6.5 27.6968 6.05228 28.1445 5.5 28.1445H3C1.34315 28.1445 0 26.8014 0 25.1445V23.3112C0 22.7589 0.447716 22.3112 1 22.3112C1.55228 22.3112 2 22.7589 2 23.3112V25.1445C2 25.6968 2.44772 26.1445 3 26.1445H5.5C6.05228 26.1445 6.5 26.5922 6.5 27.1445ZM5.83333 1.14453C5.83333 1.69682 5.38562 2.14453 4.83333 2.14453H3C2.44772 2.14453 2 2.59225 2 3.14453V4.97786C2 5.53015 1.55228 5.97786 1 5.97786C0.447716 5.97786 0 5.53015 0 4.97786V3.14453C0 1.48768 1.34315 0.144531 3 0.144531H4.83333C5.38562 0.144531 5.83333 0.592246 5.83333 1.14453ZM1 7.64453C1.55228 7.64453 2 8.09225 2 8.64453V12.3112C2 12.8635 1.55228 13.3112 1 13.3112C0.447716 13.3112 0 12.8635 0 12.3112V8.64453C0 8.09225 0.447716 7.64453 1 7.64453ZM1 14.9779C1.55228 14.9779 2 15.4256 2 15.9779V19.6445C2 20.1968 1.55228 20.6445 1 20.6445C0.447716 20.6445 0 20.1968 0 19.6445V15.9779C0 15.4256 0.447716 14.9779 1 14.9779Z" fill="#FF8A00"/>
    </svg>
    <div>
      <h3>Drag and drop an image or <label for="file-upload">select a file</label></h3>
      <input @change="(e) => onDrop(e.target.files)" accept="image/png, image/jpeg" type="file" name="file" id="file-upload">
      <p>JPG, PNG / Max. 60 MB / Min. 224 x 224px</p>
    </div>
  </div>
  <p class="uploaded" v-if="fileName">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.84211 13.1579C6.55101 12.8668 6.55101 12.3948 6.84211 12.1037L12.1037 6.84211C12.3948 6.55101 12.8668 6.55101 13.1579 6.84211C13.449 7.1332 13.449 7.60516 13.1579 7.89626L7.89626 13.1579C7.60516 13.449 7.1332 13.449 6.84211 13.1579Z" fill="#FF8A00"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7883 1.58047C12.8956 -0.526825 16.3122 -0.526824 18.4195 1.58047C20.5268 3.68777 20.5268 7.10437 18.4195 9.21167L15.7887 11.8425C15.4976 12.1336 15.0257 12.1336 14.7346 11.8425C14.4435 11.5514 14.4435 11.0794 14.7346 10.7883L17.3654 8.15751C18.8905 6.63241 18.8905 4.15973 17.3654 2.63462C15.8403 1.10952 13.3676 1.10952 11.8425 2.63462L9.21167 5.26544C8.92057 5.55654 8.44861 5.55654 8.15751 5.26544C7.86642 4.97435 7.86642 4.50239 8.15751 4.21129L10.7883 1.58047ZM5.26544 8.15751C5.55654 8.44861 5.55654 8.92057 5.26544 9.21167L2.63462 11.8425C1.10952 13.3676 1.10952 15.8403 2.63462 17.3654C4.15973 18.8905 6.63241 18.8905 8.15751 17.3654L10.7883 14.7346C11.0794 14.4435 11.5514 14.4435 11.8425 14.7346C12.1336 15.0257 12.1336 15.4976 11.8425 15.7887L9.21167 18.4195C7.10437 20.5268 3.68777 20.5268 1.58047 18.4195C-0.526824 16.3122 -0.526824 12.8956 1.58047 10.7883L4.21129 8.15751C4.50239 7.86642 4.97435 7.86642 5.26544 8.15751Z" fill="#FF8A00"/>
    </svg>
    {{fileName}}
  </p>
</template>

<script lang="ts" setup>
import { defineEmits, onMounted, onUnmounted, ref } from 'vue'
import { useHelpers } from '@/useHelpers'

const { getImageDimensions } = useHelpers()
const emit = defineEmits<{(event: 'file-dropped', file: File): void}>()
const fileName = ref('')
const active = ref(false)

async function onDrop (files: FileList) {
  active.value = false
  const file = files[0]
  const { width, height } = await getImageDimensions(file)
  if (file.type !== 'image/jpg' && file.type !== 'image/png') return
  if (file.size > 1000 * 1000 * 60) return
  if (width < 244 || height < 244) return

  emit('file-dropped', file)
  fileName.value = file.name
}

function preventDefaults (e: Event) {
  e.preventDefault()
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop']

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults)
  })
})

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults)
  })
})
</script>

<style lang="scss" scoped>
.drag {
  margin: 20px 0;
  border: 2px solid $orange;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  filter: blur(0);
  opacity: 1;
  transition: all 0.3s;

  &.active {
    opacity: .7;
    filter: blur(1px);
  }
  h3 {
    font-size: 32px;
    font-weight: 400;
    text-transform: uppercase;

    padding-bottom: 8px;

    label {
      font-weight: 700;
      cursor: pointer;
    }
  }

  input {
    opacity: 0;
    position: absolute;
    pointer-events: none;
    visibility: hidden;
  }
}
.uploaded {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  gap: 10px;
  font-size: 20px;
}
</style>
