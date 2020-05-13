<template>
  <div class="hashtag" :class="pickColor()" @click="handleClick(name)">
    <span>#{{name}}</span>
  </div>
</template>

<script>
export default {
  name: 'Hashtag',
  props: { name: String },
  computed: {
    isActive() {
      return this.$route.query.hashtag === this.name
    },
  },
  methods: {
    handleClick(name) {
      // Toggle Hashtag
      let query = Object.assign({}, this.$route.query)
      if (query.hashtag) {
        delete query.hashtag
      } else {
        query.hashtag = name
      }
      this.$router.replace({ query })
    },
    pickColor() {
      if (this.isActive) {
        return 'dark'
      }
      const options = ['pink', 'yellow', 'green', 'blue']
      const choiceIndex = Math.floor(Math.random() * options.length)
      return options[choiceIndex]
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hashtag {
  padding: $padding-xs $padding-sm;
  display: inline-block;
  margin: 0.5rem 0.25rem;

  @extend .border-thin;
  cursor: pointer;
  span {
    display: table;
    font-size: $font-size-h5;
  }

  &:hover {
    box-shadow: 0 0 !important;
  }
  &:active {
    box-shadow: 0 0 !important;
  }

  &.dark {
    @include shadow-color($dark);
  }
  &.pink {
    @include shadow-color($pink);
  }
  &.yellow {
    @include shadow-color($yellow);
  }
  &.green {
    @include shadow-color($green);
  }
  &.blue {
    @include shadow-color($blue);
  }
}
</style>
