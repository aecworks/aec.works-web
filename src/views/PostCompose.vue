<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">New Post</h2>
    </div>
    <Editor />
  </div>
</template>

<script>
import api from '@/api'
import Editor from '@/components/Editor'

export default {
  name: 'Post',
  components: { Editor },
  data() {
    return {
      post: null,
    }
  },
  async created() {
    // this.post = await api.getPost(this.slug)
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.post-content {
  font-family: $font-family-serif;
  margin-bottom: 2rem;
}
.post-hashtags {
  margin-bottom: 4rem;
}
.post-author {
  display: flex;
  align-items: center;
  margin-bottom: 4rem;
}
</style>
