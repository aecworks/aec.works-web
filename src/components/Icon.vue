<template>
  <div class="icon" :class="{'pointer': clickable}" @click="$emit('click')">
    <img :src="iconPath" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'IconCounter',
  props: {
    onClick: Function,
    clickable: {
      type: Boolean,
      default: false,
    },
    icon: {
      required: true,
      type: String,
    },
  },
  computed: {
    iconPath() {
      return require(`@/assets/images/${this.icon}.svg`)
    },
  },
}
</script>

<style lang="scss" scoped>
.icon {
  margin-right: 1rem;
  display: flex;
  align-items: center;
  img {
    margin-right: 0.4rem;
  }
}
</style>
