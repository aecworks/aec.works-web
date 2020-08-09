<template>
  <div class="icon-counter" @click="$emit('click')">
    <img :src="iconPath" />
    <span class="count">{{count}}</span>
  </div>
</template>

<script>
export default {
  name: 'IconCounter',
  props: {
    count: Number,
    onClick: Function,
    icon: String,
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
.icon-counter {
  margin-right: 1rem;
  display: flex;
  align-items: center;
  img {
    margin-right: 0.3rem;
  }
}
</style>
