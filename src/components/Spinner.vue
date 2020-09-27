<template>
  <div class="lds-ellipsis">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'Discussion',
  components: {
    Comment,
    CommentReply,
  },
  props: {
    threadId: { required: true, type: Number },
  },
  data() {
    return {
      comments: [],
      offset: 0,
    }
  },
  async created() {
    if (this.threadId) {
      this.fetchItems(0)
    }
  },
  methods: {
    async fetchItems(offset, limit = 3) {
      const { results: comments } = await api.getCommentsByThreadId(this.threadId, {
        offset,
        limit,
      })
      this.comments = [...this.comments, ...comments]
      this.offset = this.offset + comments.length
    },
    handleReply() {
      setTimeout(() => {
        this.fetchItems(this.offset, 1)
      }, 1000)
    },
    onVisible({ going }) {
      if (going === 'in') {
        this.fetchItems(this.offset)
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.discussion {
  margin-bottom: 10rem;
}
</style>
