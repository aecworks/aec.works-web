<template>
  <div
    class="hashtag"
    :class="[clickable ? 'clickable' : '', isActive ? 'active' : '']"
    @click="handleClick"
  >
    <span>#{{ slug }}</span>
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
      return this.$route.query.hashtags && this.$route.query.hashtags.indexOf(this.slug) !== -1
    },
  },
  methods: {
    handleClick() {
      this.$emit('click', this.slug)
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
    cursor: pointer;
    &:hover {
      @include shadow-color($dark);
    }
    &.active:hover {
      @include shadow-color($yellow);
    }
  }

  &.dark,
  &.active {
    background-color: $dark;
    color: white;
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
