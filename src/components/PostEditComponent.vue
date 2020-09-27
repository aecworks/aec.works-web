<template>
  <Card :show-image="false">
    <input
      v-model="title"
      class="post-title"
      :class="{ empty: title === '' }"
      placeholder="Your Title"
      @input="handleInput"
    />
    <div class="mt-1">
      <Editor v-model="body" @input="handleInput" />
    </div>
    <div class="mt-2">
      <Button v-if="isValid" @click="handleSave">Save</Button>
      <Button @click="handleCancel">Cancel</Button>
    </div>
  </Card>
</template>

<script>
import Card from './Card.vue'
import Button from '../components/forms/Button.vue'
import api from '../api'
import Editor from '@/components/Editor'
import { waitForLogin } from '@/mixins'

const POST_DRAFT = 'draf_post'

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
      title: '',
    }
  },
  computed: {
    isEditing() {
      return Boolean(this.slug)
    },
    isValid() {
      return this.body && this.title
    },
  },
  async created() {
    let body, title
    if (this.isEditing) ({ body, title } = await api.getPost(this.slug))
    else ({ body, title } = JSON.parse(localStorage.getItem(POST_DRAFT) || '{}'))
    this.body = body
    this.title = title
  },

  methods: {
    async handleSave() {
      await waitForLogin()

      const hashtags = this.body.match(/#[a-z]+/gi) || []
      let post
      if (this.isEditing) {
        post = await api.patchPost(this.slug, this.title, this.body, hashtags)
      } else {
        post = await api.postPost(this.title, this.body, hashtags)
      }
      this.$router.push({ name: 'Post', params: { slug: post.slug } })
    },
    handleCancel() {
      this.$emit('cancel')
    },
    handleInput() {
      const { body, title } = this
      localStorage.setItem(POST_DRAFT, JSON.stringify({ body, title }))
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
