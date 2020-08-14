<template>
  <div class="c-textinput">
    <span class="icon" v-if="icon">
      <img :src="iconPath" />
    </span>
    <input
      class="fill-x"
      :placeholder="placeholder"
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    value: { required: true },
    icon: { required: false },
    placeholder: { required: false },
  },
  data() {
    return {}
  },
  computed: {
    iconPath() {
      return require(`@/assets/images/${this.icon}.svg`)
    },
  },
  methods: {
    // handleInput() {
    //   this.$emit('input', $event.target.value)
    // },
  },
}
</script>

<style lang="scss" scoped>
.c-textinput {
  position: relative;
  .icon {
    right: 1rem;
    position: absolute;
    line-height: 2.2rem;
    vertical-align: middle;
  }
}
</style>
