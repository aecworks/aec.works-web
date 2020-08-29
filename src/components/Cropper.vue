
<template>
  <Modal @clickOutside="handleDone" class="cropper-container">
    <div v-if="isLoading" class="img-loader flex flex-center flex-center-vertical">
      <Loader />
    </div>
    <div v-show="!isLoading">
      <img id="img-crop" ref="img" />
    </div>
    <canvas id="canvas" style="display: none;" />
  </Modal>
</template>

<script>
import Loader from './Loader.vue'
import Modal from '@/components/Modal'
import Croppr from 'croppr'
import 'croppr/dist/croppr.css'

export default {
  name: 'Crop',
  components: { Modal, Loader },
  props: {
    imgUrl: {
      type: String,
      required: true,
    },
    cropRatio: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isLoading: true,
      croppr: null,
    }
  },
  mounted() {
    // https://jamesooi.design/Croppr.js/#install
    this.$refs.img.src = this.imgUrl
    this.$refs.img.onload = () => {
      const interval = setInterval(() => {
        if (this.$refs.img.naturalWidth > 0 && this.$refs.img.naturalHeight > 0) {
          clearInterval(interval)
          this.isLoading = false
          console.log(this.cropRatio)
          this.$nextTick(() => {
            this.croppr = new Croppr('#img-crop', {
              aspectRatio: this.cropRatio,
              minSize: [200, 200, 'px'],
              startSize: [100, 100, '%'],
            })
          })
        }
      }, 50)
    }
  },
  methods: {
    handleDone() {
      this.isLoading = true

      const { x, y, width, height } = this.croppr.getValue()

      const image = new Image()
      const canvas = document.getElementById('canvas')
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      image.src = this.imgUrl
      image.crossOrigin = 'anonymous'

      image.onload = function() {
        ctx.drawImage(
          image,
          x, // top
          y, // left
          width,
          height,
          0,
          0, // Place the result at 0, 0 in the canvas,
          width,
          height, // With as width / height: 100 * 100 (scale)
        )
        // const dataUrl = canvas.toDataURL('image/png', 1.0)
        canvas.toBlob(
          blob => {
            const file = new File([blob], 'image.png', { type: blob.type })
            this.$emit('done', file)
          },
          'image/png',
          1,
        )
      }.bind(this)
    },
  },
}
</script>

<style lang="scss">
#img-crop {
  display: block; // Remove gap below image
  max-height: 600px;
  max-width: 600px;
}

.croppr img {
  max-height: 600px;
  max-width: 600px;
}

.img-loader {
  // TODO: Combine with login modal loader
  width: 200px;
  height: 100px;
  background-color: $cream;
  opacity: 1;
}
</style>
