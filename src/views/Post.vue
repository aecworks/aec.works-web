<template>
  <div class="page">
    <div v-if="post">

      <div class="page-header">
        <h2 class="page-title">{{post.title}}</h2>
      </div>

      <div class="page-content">
        <div class="post-content" v-html="post.body" />
      </div>

      <div class="post-hashtags">
        <Hashtag v-for="name in post.hashtags" :name="name" :key="name" />
      </div>

      <div class="post-author">
        <img
          class="post-author-avatar"
          src="https://pbs.twimg.com/profile_images/1160338085235707904/NMNIRutH_400x400.jpg"
        />
        <h4 class="blog-author">{{post.profile.name}}</h4>
      </div>

      <Discussion :threadId="post.commentThread" />
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Discussion from '@/components/Discussion'
import Hashtag from '@/components/Hashtag'

export default {
  name: 'Post',
  components: { Discussion, Hashtag },
  props: ['id'],
  data() {
    return {
      post: null,
    }
  },
  async created() {
    this.post = await api.getPost(this.id)
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

  .post-author-avatar {
    @extend .avatar;
  }

  h4 {
    margin-left: 1rem;
    margin-bottom: 0;
  }
}
</style>
