<template>
  <Card :showImage="false">
    <input
      class="post-title"
      :class="{'empty': postTitle === ''}"
      v-model="postTitle"
      placeholder="Your Title"
    />
    <div class="mt-1">
      <Editor v-model="body" />
    </div>
    <div class="mt-2">
      <Button text="Save" @click="handleSave" />
      <Button text="Cancel" @click="handleCancel" />
    </div>
  </Card>
</template>

<script>
import Card from './Card.vue'
import Button from '../components/forms/Button.vue'
import api from '../api'
import Editor from '@/components/Editor'

export default {
  name: 'PostEdit',
  components: { Editor, Button, Card },
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
    handleCancel() {
      this.$emit('cancel')
    },
    handleInput(e) {
      this.postTitle = e.target.innerText
    },
  },
}
</script>

<style lang="scss" scoped>
.post-title {
  @extend h2;
  border: none;

  &.empty {
    color: $light-gray;
    &::after {
      content: 'Title';
    }
  }
}
</style>
