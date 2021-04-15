<template>
  <div class="icon" :class="{ pointer: clickable }" @click="$emit('click')">
    <img :src="iconPath" />
    <span class="small">{{ count }}</span>
  </div>
</template>

<script>
export default {
  name: 'IconCounter',
  props: {
    count: {
      default: 0,
      type: Number,
    },
    icon: {
      required: true,
      type: String,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      comments: [],
    }
  },
  computed: {
    iconPath() {
      return require(`@/assets/images/${this.icon}.svg`)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.icon {
  margin-right: 1rem;
  display: flex;
  align-items: center;
  img {
    margin-right: 0.3rem;
  }
}
</style>
