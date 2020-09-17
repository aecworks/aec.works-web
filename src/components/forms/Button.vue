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
      if (this.kind) return `button-${this.kind}`
      else return 'button'
    },
  },
  methods: {
    handleClick() {
      this.$emit('click')
    },
  },
}
</script>
