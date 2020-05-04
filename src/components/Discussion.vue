<template>
  <div class="discussion">
    <Comment v-for="(comment, index) in comments" :key="comment.id" v-bind="{comment, index}" />
    <input type="text" class="discussion-input form-text fill" placeholder="Comment" />
  </div>
</template>

<script>
import api from '@/api'
import Comment from '@/components/Comment'
export default {
  name: 'Discussion',
  props: ['threadId'],
  components: {
    Comment,
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
    async fetchItems(offset) {
      const { results: comments } = await api.getCommentsByThreadId(this.threadId, { offset })
      this.comments = [...this.comments, ...comments]
      // this.offset = this.offset + items.length
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.discussion {
  margin-bottom: 2rem;
}
.discussion-input {
  margin-top: 2rem;
}
</style>
