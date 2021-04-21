<template>
  <div>
    <p class="collapsible-text">
      {{ visibleText }}
    </p>
    <div v-if="shouldTruncate && isTruncated" class="mt-1 mb-2">
      <a class="pointer" @click="isTruncated = !isTruncated">read more</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollapsibleParagraph',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isTruncated: true,
    }
  },

  computed: {
    visibleText() {
      return this.isTruncated ? this.text.slice(0, this.breakpointIndex) : this.text
    },
    shouldTruncate() {
      return this.text.length > this.breakpointIndex
    },
    breakpointIndex() {
      const match = this.text.match(/\r|\n\n/)
      return match ? match.index : this.text.length
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.collapsible-text {
  white-space: pre-line;
}
</style>
