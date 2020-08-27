<template>
  <div class="c-editabletext">
    <span :contenteditable="editable">
      {{value}}
    </span>
    <!-- <span class="icon" v-if="icon">
      <img :src="iconPath" />
    </span>-->
    <!-- <input
      :placeholder="placeholder"
      :readonly="!editable"
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div> -->
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    editable: { required: true },
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
.c-editabletext {
  input {
    border: none;
    box-shadow: none;
    padding: 0;
    box-sizing: border-box;
    border-radius: none;
  }
  // position: relative;
  // .icon {
  //   right: 1rem;
  //   position: absolute;
  //   line-height: 2.2rem;
  //   vertical-align: middle;
  // }
}
</style>
