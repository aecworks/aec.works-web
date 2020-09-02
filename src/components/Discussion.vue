<template>
  <div class="discussion">
    <Comment
      v-for="(comment, index) in comments"
      :key="comment.id"
      v-bind="{comment, index}"
      v-waypoint="{ active: index + 1=== comments.length, callback: onVisible }"
    />
    <Loader v-if="isLoading" />
    <CommentReply class="root-comment" v-bind="{threadId}" @replied="handleReplied" />
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
      count: 0,
      isLoading: false,
    }
  },
  async created() {
    if (this.threadId) {
      this.fetchItems(0)
    }
  },
  computed: {
    hasMore() {
      return this.count > this.comments.length
    },
  },
  methods: {
    async fetchItems(offset, limit = 5) {
      const { results, count } = await api.getCommentsByThreadId(this.threadId, {
        offset,
        limit,
      })
      this.comments = [...this.comments, ...results]
      this.offset = this.offset + results.length
      this.count = count
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
      // TODO: Make paginated loading util
      if (going === 'in' && this.hasMore) {
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
  .root-comment {
    margin-top: 4rem;
  }
}
</style>
