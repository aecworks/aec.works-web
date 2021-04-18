<template>
  <div class="corner-ribbon top-right blue">
    <h5 class="small">{{ text }}</h5>
    <!-- <h5 class="small">{{text}} 👋</h5> -->
  </div>
</template>

<script>
export default {
  name: 'Ribbon',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
// https://codepen.io/eode9/pen/twkKm

.corner-ribbon {
  h5 {
    font-weight: $font-weight-normal;
    color: $dark !important;
  }
  background: $yellow;
  box-shadow: (0 0 3px rgba(0, 0, 0, 0.3), 0 0 2px rgba(0, 0, 0, 0.5));
  width: 200px;
  position: absolute;
  top: 25px;
  left: -50px;
  text-align: center;
  line-height: 40px;
  letter-spacing: 1px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.corner-ribbon.top-right {
  top: 25px;
  right: -50px;
  left: auto;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
</style>
