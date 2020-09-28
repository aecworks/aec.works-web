<template>
  <div class="c-editabletext">
    <span :contenteditable="editable">
      {{ value }}
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
    editable: {
      type: Boolean,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
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
