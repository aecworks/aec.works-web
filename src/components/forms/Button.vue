<template>
  <div :class="cls" @click="handleClick">
    <span>
      <slot>?</slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    disabled: {
      type: Boolean,
    },
    kind: {
      required: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    cls() {
      return {
        disabled: this.disabled,
        'button-text': this.kind === 'text',
        button: !this.kind,
      }
      // if (this.disabled)
      //   if (this.kind) return `button-${this.kind}`
      //   else return 'button'
    },
  },
  methods: {
    handleClick() {
      if (!this.disabled) this.$emit('click')
    },
  },
}
</script>
