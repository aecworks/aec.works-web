<template>
  <div>
    <p class="collapsible-text">
      {{ visibleText }}
    </p>
    <div v-if="shouldTruncate && isTruncated" class="mt-1 mb-2">
      <a class="pointer" @click="isTruncated = !isTruncated">
        {{ isTruncated ? 'show more' : 'show less' }}
      </a>
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
      return this.text.match(/(\r?\n)\s*\1+/).index
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
