<template>
  <div class="modal-overlay" @click="onClick">
    <div class="modal">
      <slot />
    </div>
  </div>
</template>

<script>
// import api from '@/api'

export default {
  name: 'Modal',
  components: {},
  props: ['isActive'],
  data() {
    return {}
  },
  created() {},
  methods: {
    onClick(el) {
      if (el.target.className === 'modal-overlay') {
        this.$emit('on-close')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  z-index: 100;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: $cream;
  opacity: 0.75;
}
.modal {
  display: block;
  position: fixed;
  z-index: 101;
  // background-color: white;

  left: 50%;
  top: 50%;

  width: 600px;
  max-width: 100%;
  height: 400px;
  max-height: 100%;

  transform: translate(-50%, -50%);

  background-color: $cream;
  box-shadow: 10px 10px $pink;

  border: 2px $dark solid;
  border-radius: 5px;
}
</style>
