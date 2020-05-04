<template>
  <div class="hashtag" :class="randomColor()">
    <span>#{{name}}</span>
  </div>
</template>

<script>
export default {
  name: 'Hashtag',
  props: ['name'],
  methods: {
    randomColor() {
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
  border-radius: 3px;
  border: 1px solid $dark;
  margin: 0.5rem 0.25rem;
  cursor: pointer;
  span {
    display: table;
    font-size: $font-size-h5;
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
  &:hover {
    @include shadow-color($dark);
  }
}
</style>
