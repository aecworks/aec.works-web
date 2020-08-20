<template>
  <div class="comment-reply">
    <form ref="form" class="form">
      <textarea
        type="text"
        v-model="commentText"
        @input="handleInput"
        ref="textareaElement"
        class="comment-reply-input fill-x"
        placeholder="Much thoughts here"
      />
      <Button v-if="commentText" text="Post" @click="handleSubmitClick" />
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
  props: ['threadId', 'parentId'],
  components: {
    Button,
  },
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
    async handleSubmitClick() {
      await waitForLogin()
      let parent = {}
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
  .comment-reply-input {
    margin-top: 2rem;
    transition: height 200ms;
    height: 2.5rem;
    margin-bottom: 1rem;
  }
}
</style>
