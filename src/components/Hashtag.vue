<template>
  <div class="hashtag" :class="[clickable ? 'pointer' : '', pickColor()]" @click="$emit('click')">
    <span>#{{slug}}</span>
  </div>
</template>

<script>
export default {
  name: 'Hashtag',
  props: {
    slug: String,
    clickable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isActive() {
      return this.$route.query.hashtag === this.slug
    },
  },
  methods: {
    pickColor() {
      // if (this.isActive) {
      //   return 'dark'
      // }
      // const options = ['pink', 'yellow', 'green', 'blue']
      // const choiceIndex = Math.floor(Math.random() * options.length)
      // return options[choiceIndex]
      return ''
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hashtag {
  padding: $padding-xs $padding-sm;
  display: inline-block;
  margin: 0.25rem 0.25rem;

  @extend .border-thin;
  span {
    display: table;
    font-size: $font-size-h5;
  }

  &.clickable {
    &:hover {
      box-shadow: 0 0 !important;
    }
    &:active {
      box-shadow: 0 0 !important;
    }
  }

  &.dark {
    background-color: $dark;
    color: $cream;
    // @include shadow-color($dark);
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
