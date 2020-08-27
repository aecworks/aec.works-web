<template>
  <div class="discussion">
    <Comment
      v-for="(comment, index) in comments"
      :key="comment.id"
      v-bind="{comment, index}"
      v-waypoint="{ active: index + 1=== comments.length, callback: onVisible }"
    />
    <Loader v-if="isLoading" />
    <CommentReply v-bind="{threadId}" @replied="handleReplied" />
  </div>
</template>

<script>
import api from '@/api'
import Comment from '@/components/Comment'
import CommentReply from '@/components/CommentReply'
import Loader from '@/components/Loader'

export default {
  name: 'Discussion',
  props: {
    threadId: { required: true, type: Number },
  },
  components: {
    Comment,
    CommentReply,
    Loader,
  },
  data() {
    return {
      comments: [],
      offset: 0,
      isLoading: false,
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
    async handleReplied() {
      this.isLoading = true
      setTimeout(() => {
        this.fetchItems(this.offset, 1).then(() => {
          this.isLoading = false
        })
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
  margin-top: 5rem;
  margin-bottom: 10rem;
}
</style>
