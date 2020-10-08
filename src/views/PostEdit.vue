<template>
  <div class="wrapper">
    <div class="content">
      <div class="page">
        <div class="page-header">
          <input
            v-model="postTitle"
            class="page-title"
            :class="{ empty: postTitle === '' }"
            placeholder="Your Title"
          />
        </div>
        <div class="post-editor">
          <Editor v-model="body" />
        </div>
        <div class="post-editor-actions mt-3">
          <Button @click="handleSave">Save</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '../components/forms/Button.vue'
import api from '../api'
import Editor from '@/components/Editor'

export default {
  name: 'PostEdit',
  metaInfo: {
    title: 'Edit Post',
  },
  components: { Editor, Button },
  props: {
    slug: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      body: '',
      postTitle: '',
    }
  },
  computed: {
    isEditing() {
      return Boolean(this.slug)
    },
  },
  async created() {
    if (this.isEditing) {
      const { body, title } = await api.getPost(this.slug)
      this.body = body
      this.postTitle = title
    }
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
    handleInput(e) {
      this.postTitle = e.target.innerText
    },
    // handleTitleFocus() {},
  },
}
</script>

<style lang="scss" scoped>
.page-title {
  @extend h1;
  border: none;

  &.empty {
    color: $light-gray;
    &::after {
      content: 'Title';
    }
  }
}
.post-editor {
}
.post-editor-actions {
  margin-top: $padding-4xl;
  margin-bottom: 2rem;
}
</style>
