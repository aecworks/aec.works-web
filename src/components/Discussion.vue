<template>
  <div class="discussion">
    <Comment
      v-for="(comment, index) in comments"
      :key="comment.id"
      v-bind="{comment, index}"
      v-waypoint="{ active: index + 1=== comments.length, callback: onVisible }"
    />
    <CommentReply v-bind="{threadId}" @replied="handleReply" />
  </div>
</template>

<script>
import api from '@/api'
import Comment from '@/components/Comment'
import CommentReply from '@/components/CommentReply'

export default {
  name: 'Discussion',
  props: {
    threadId: { required: true, type: Number },
  },
  components: {
    Comment,
    CommentReply,
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
