<template>
  <div class="page">
    <div v-if="post">
      <div class="page-header">
        <h2 class="page-title">{{post.title}}</h2>
      </div>

      <div class="post-content" v-html="post.body" />

      <div class="post-hashtags">
        <Hashtag v-for="name in post.hashtags" :name="name" :key="name" />
      </div>

      <div class="post-author">
        <Avatar :profile="post.profile" />
      </div>

      <Discussion :threadId="post.thread" />
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Discussion from '@/components/Discussion'
import Hashtag from '@/components/Hashtag'
import Avatar from '@/components/Avatar'

export default {
  name: 'Post',
  components: { Discussion, Hashtag, Avatar },
  props: {
    slug: { required: true, type: String },
  },
  data() {
    return {
      post: null,
    }
  },
  async created() {
    this.post = await api.getPost(this.slug)
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
