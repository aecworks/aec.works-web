<template>
  <div class="modal-container">
    <div class="modal">
      <slot />
    </div>
    <div class="modal-overlay" @click="onOverlayClick" />
  </div>
</template>

<script>
export default {
  name: 'Modal',
  components: {},
  props: ['isActive'],
  data() {
    return {}
  },
  created() {},
  methods: {
    onOverlayClick(el) {
      if (el.target.className === 'modal-overlay') {
        this.$emit('clickOutside')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .modal-overlay {
    position: fixed;
    z-index: 100;
    background-color: white;
    opacity: 0.75;
    width: 100%;
    height: 100%;
  }
  .modal {
    z-index: 101;
    background-color: white;
    @extend .border-thick;
    @include shadow-color($dark);

    @include for-large-up {
      width: initial;
      height: initial;
      // width: 600px;
    }
  }
}
</style>
