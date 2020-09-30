<template>
  <v-lazy-image :src="src" :src-placeholder="require('@/assets/images/spinner.svg')" />
</template>

<script>
import VLazyImage from 'v-lazy-image'

export default {
  components: {
    VLazyImage,
  },
  props: {
    src: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped></style>
