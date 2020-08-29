<template>
  <div class="icon" :class="{'pointer': clickable}" @click="$emit('click')">
    <div class="flex">
      <img :src="iconPath" />
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconCounter',
  props: {
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
$icon-height: 30px;
.icon {
  display: inline-block;
  line-height: $icon-height;
  img {
    height: $icon-height;
  }
}
</style>
