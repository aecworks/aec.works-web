<template>
  <div class="pagination-row">
    <div v-if="hasBefore" class="pagination-number button" @click="$emit('click', 1)">First</div>
    <div v-if="hasBefore" class="pagination-number button" @click="$emit('click', currentPage - 1)">
      Previous
    </div>
    <div v-if="hasMore" class="pagination-number button" @click="$emit('click', currentPage + 1)">
      Next
    </div>
    <div v-if="hasMore" class="pagination-number button" @click="$emit('click', numPages)">
      Last
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    numPages: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // isLoading: true,
    }
  },
  computed: {
    hasBefore() {
      return this.currentPage > 1
    },
    hasMore() {
      return this.currentPage < this.numPages
    },
    currentPage() {
      return Number(this.$route.query.page || 1)
    },
  },
}
</script>

<style lang="scss">
.pagination-row {
  padding: 1rem 0;
}
.pagination-number {
  &.is-active {
    background-color: $dark;
    color: white;
  }
}
</style>
