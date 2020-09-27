<template>
  <div class="comment-reply">
    <form ref="form" class="form">
      <textarea
        ref="textareaElement"
        v-model="commentText"
        type="text"
        class="input comment-reply-input fill-x"
        placeholder="Comment"
        @input="handleInput"
      />
      <Button v-if="commentText" @click="handleSubmitClick">Post</Button>
      <Button v-if="commentText" @click="handleCancel">Cancel</Button>
    </form>
  </div>
</template>

<script>
import Button from './forms/Button.vue'
import api from '@/api'
import { waitForLogin } from '@/mixins'

const DRAFT_COMMENT = 'draft_comment'

export default {
  name: 'CommentReply',
  components: {
    Button,
  },
  props: ['threadId', 'parentId'],
  data() {
    return {
      commentText: '',
    }
  },
  computed: {},
  created() {
    const draft = localStorage.getItem(DRAFT_COMMENT)
    if (draft) {
      this.commentText = draft
    }
  },
  methods: {
    async handleInput() {
      localStorage.setItem(DRAFT_COMMENT, this.commentText)
      this.$refs.textareaElement.style.height = 'auto'
      const el = this.$refs.textareaElement
      el.style.height = el.scrollHeight + 5 + 'px'
      if (!this.$refs.textareaElement.textLength) {
        el.style.height = ''
      }
    },
    handleCancel() {
      localStorage.removeItem(DRAFT_COMMENT)
      this.commentText = ''
      this.$emit('cancel')
    },
    async handleSubmitClick() {
      await waitForLogin()
      api.postComment(this.commentText, this.threadId, this.parentId)
      this.commentText = ''
      this.$emit('replied')
      localStorage.removeItem(DRAFT_COMMENT)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.comment-reply {
  margin-bottom: 2rem;

  .comment-reply-input {
    transition: height 200ms;
    height: 2.5rem;
  }
}
</style>
