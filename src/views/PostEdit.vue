<template>
  <div class="wrapper">
    <div class="content">
      <div class="page-header">
        <input
          class="page-title"
          :class="{'empty': postTitle === ''}"
          v-model="postTitle"
          placeholder="Your Title"
        />
      </div>
      <div class="post-editor">
        <Editor v-model="body" />
      </div>
      <div class="post-editor-actions mt-3">
        <Button text="Save" @click="handleSave" />
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
  components: { Editor, Button },
  props: {
    slug: {
      required: false,
      type: String,
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
  // font-size: $font-size-h1;
  // font-family: $font-family-serif;
  // font-weight: $font-weight-bold;
  border: none;
  border-left: 1px solid $yellow;
  padding-left: 1rem;

  &.empty {
    color: $light-gray;
    &::after {
      content: 'Title';
    }
  }
}
.post-editor {
  border-left: 1px solid $yellow;
}
.post-editor-actions {
  margin-top: $padding-4xl;
  margin-bottom: 2rem;
}
</style>
