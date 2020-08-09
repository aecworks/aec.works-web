<template>
  <div class="content">
    <div class="page">
      <div class="page-header">
        <h2
          class="page-title"
          v-html="postTitle"
          @focusout="handleUpdatePostTitle"
          contenteditable="true"
        ></h2>
      </div>
      <div class="post-editor">
        <Editor v-model="body" />
      </div>
      <div class="post-editor-actions">
        <button class="button" @click="handleSave">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
import Editor from '@/components/Editor'

export default {
  name: 'PostEdit',
  components: { Editor },
  props: {
    slug: {
      required: false,
    },
  },
  data() {
    return {
      body: '',
      postTitle: '',
    }
  },
  async created() {
    if (this.isEditing) {
      const { body, title } = await api.getPost(this.slug)
      this.body = body
      this.postTitle = title
    } else {
      this.postTitle = 'Your title here'
    }
  },
  computed: {
    isEditing() {
      return Boolean(this.slug)
    },
  },

  methods: {
    async handleSave() {
      const hashtags = this.body.match(/#[a-z]+/gi) || []
      let post
      if (this.isEditing) {
        post = await api.patchPost(this.slug, this.postTitle, this.body, hashtags)
      } else {
        post = await api.postPost(this.postTitle, this.body, hashtags)
      }
      this.$router.push({ name: 'Post', params: { slug: post.slug } })
    },
    handleUpdatePostTitle(e) {
      this.postTitle = e.target.innerText
    },
  },
}
</script>

<style lang="scss" scoped>
.post-editor {
  margin-top: $padding;
}
.post-editor-actions {
  margin-top: $padding-4xl;
  font-family: $font-family-serif;
  margin-bottom: 2rem;
}
</style>
