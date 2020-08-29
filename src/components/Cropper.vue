
<template>
  <Modal @clickOutside="handleDone">
    <div>
      <img id="img-crop" ref="img" alt />
    </div>
    <canvas id="canvas" style="display: none;" />
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'
import Croppr from 'croppr'
import 'croppr/dist/croppr.css'

export default {
  name: 'Crop',
  components: { Modal },
  props: ['imgUrl'],
  data() {
    return {
      isLoading: false,
      croppr: null,
    }
  },
  mounted() {
    // https://jamesooi.design/Croppr.js/#install
    this.$refs.img.src = this.imgUrl
    this.$refs.img.onload = () => {
      this.croppr = new Croppr('#img-crop', {
        aspectRatio: 1,
        minSize: [200, 200, 'px'],
        startSize: [100, 100, '%'],
      })
    }
  },
  methods: {
    handleDone() {
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
}

.croppr img {
  max-height: 600px;
}
</style>
