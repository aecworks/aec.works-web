<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">Edit Post</h2>
    </div>
    <div class="post-editor">
      <Editor v-model="body" />
    </div>
    <div class="post-editor-actions">
      <button class="button" @click="handleSave">Save</button>
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
    }
  },
  async created() {
    if (this.isEditing) {
      const { body } = await api.getPost(this.slug)
      this.body = body
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
        post = await api.patchPost(this.slug, 'Test Title', this.body, hashtags)
      } else {
        post = await api.postPost('Test Title', this.body, hashtags)
      }
      this.$router.push({ name: 'Post', params: { slug: post.slug } })
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
