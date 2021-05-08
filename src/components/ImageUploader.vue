<template>
  <div>
    <div class="flex flex-down">
      <div class="mt">
        <Button kind="text" aria-label="upload logo file" @click="handleFileUploaded()">
          Upload
        </Button>
        <Button kind="text" aria-label="upload logo URL" @click="startPaste()">Paste</Button>
      </div>
    </div>

    <Cropper
      v-if="isCropping"
      :img-url="dataUri"
      :crop-ratio="cropRatio"
      @done="cropCompleted"
      @cancel="cropCanceled"
    />

    <Modal v-if="isPasting" @clickOutside="endPaste">
      <div class="section flex flex-down flex-center">
        <IconLarge class="mt-1" icon="paste" />
        <p class="mt-1 muted small">
          <code>ctrl+v</code>
        </p>
      </div>
    </Modal>
  </div>
</template>

<script>
import Button from './forms/Button.vue'
import IconLarge from '../components/IconLarge.vue'
import api from '@/api'
import Cropper from '@/components/Cropper.vue'
import Modal from '@/components/Modal.vue'
import { fileIsTooBig, filePrompt, fileToBase64, subscribePaste, unsubscribePaste } from '@/utils'

export default {
  name: 'ImageUploader',

  components: {
    Button,
    Cropper,
    Modal,
    IconLarge,
  },

  props: {
    cropRatio: {
      default: 1,
      type: Number,
    },
  },

  data() {
    return {
      isCropping: false,
      isPasting: null,
      dataUri: null,
    }
  },

  methods: {
    startPaste() {
      this.isPasting = true
      subscribePaste(this.onPasteEvent)
    },

    endPaste() {
      this.isPasting = false
      unsubscribePaste()
    },

    async onPasteEvent(file) {
      if (fileIsTooBig(file)) {
        this.$emit('error', 'File is a bit big, try a smaller one (3MB)')
        this.isCropping = false
        this.endPaste()
      } else {
        this.dataUri = await fileToBase64(file)
        this.startCrop()
        this.endPaste()
      }
    },

    async handleFileUploaded() {
      const file = await filePrompt()
      if (fileIsTooBig(file)) {
        this.$emit('error', 'File is a bit big, try a smaller one (3MB)')
        this.isCropping = false
      } else {
        this.dataUri = await fileToBase64(file)
        this.startCrop()
      }
    },

    startCrop() {
      this.isCropping = true
    },

    cropCanceled() {
      this.isCropping = false
    },

    async cropCompleted(file) {
      const image = await api.putImage(file, file, file.type)
      this.isCropping = false
      this.$emit('uploaded', image)
    },
  },
}
</script>

<style lang="scss"></style>
