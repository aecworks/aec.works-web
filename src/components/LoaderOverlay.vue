<template>
  <div class="overlay" @click="onClick">
    <div class="overlay-container">
      <Loader></Loader>
    </div>
  </div>
</template>

<script>
import Loader from './Loader.vue'
export default {
  name: 'LoaderOverlay',
  components: { Loader },
  created() {},
  methods: {
    onClick() {
      this.$emit('click')
    },
  },
}
</script>

<style lang="scss" scoped>
.overlay {
  z-index: 100;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $cream;
  opacity: 0.75;

  .overlay-container {
    z-index: 101;
  }
}
</style>
