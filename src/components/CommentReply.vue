<template>
  <div class="comment-reply">
    <form class="form" @submit.prevent="handleFormSubmit">
      <textarea
        type="text"
        v-model="commentText"
        @input="handleInput"
        ref="textareaElement"
        class="comment-reply-input fill-x"
        placeholder="Much thoughts here"
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
    handleInput() {
      this.$refs.textareaElement.style.height = 'auto'
      const el = this.$refs.textareaElement
      el.style.height = el.scrollHeight + 5 + 'px'
      if (!this.$refs.textareaElement.textLength) {
        el.style.height = ''
      }
    },
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
    margin-bottom: 1rem;
  }
}
</style>
