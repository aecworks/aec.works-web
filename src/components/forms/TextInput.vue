<template>
  <div class="c-textinput">
    <span v-if="icon" class="icon">
      <img :src="iconPath" />
    </span>
    <input
      class="input fill-x"
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
    value: { required: true, type: String },
    icon: { default: '', type: String },
    placeholder: { default: '', type: String },
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
    position: absolute;
    right: 1rem;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
  }
}
</style>
