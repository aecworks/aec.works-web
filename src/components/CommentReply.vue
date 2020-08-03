<template>
  <div class="comment-reply">
    <form class="form" @submit.prevent="handleFormSubmit">
      <textarea
        type="text"
        v-model="commentText"
        class="comment-reply-input fill-x"
        placeholder="This is dope"
      />
      <button v-if="commentText" class="button" type="submit">Post</button>
    </form>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'CommentReply',
  props: ['threadId', 'parentId'],
  data() {
    return {
      commentText: '',
    }
  },
  computed: {},
  methods: {
    handleFormSubmit() {
      api.postComment(this.threadId, this.commentText)
      this.commentText = ''
      this.$emit('replied')
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.comment-reply {
  .comment-reply-input {
    margin-top: 2rem;
    transition: height 200ms;
    height: 2.5rem;
    &:focus {
      height: 8rem;
    }
    margin-bottom: 1rem;
  }
}
</style>
