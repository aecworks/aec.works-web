<template>
  <div class="discussion">
    <Comment v-for="(comment, index) in comments" :key="comment.id" v-bind="{comment, index}" />
    <textarea
      type="text"
      v-model="commentText"
      class="discussion-input form-text fill-x"
      placeholder="Comment"
    />
    <div v-if="commentText" class="button">Post</div>
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
      commentText: '',
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
  margin-bottom: 10rem;
}
.discussion-input {
  margin-top: 2rem;
  transition: height 200ms;
  height: 2.5rem;
  &:focus {
    height: 8rem;
  }
  margin-bottom: 1rem;
}
</style>
