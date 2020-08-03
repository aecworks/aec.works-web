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

      <div class="post-actions">
        <button class="button" @click="handleEdit">Edit</button>
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
  computed: {
    isAuthor() {
      const profile = this.$store.state.users.profile
      return profile && profile.id === this.post.profile.id
    },
  },
  methods: {
    handleEdit() {
      this.$router.push({ name: 'PostEdit', params: { slug: this.slug } })
    },
  },
}
</script>

<style lang="scss">
.post-content {
  font-family: $font-family-serif;
  margin-bottom: 2rem;

  // HACK
  img {
    max-width: 100% !important;
  }
  // Editor Tweaks
  h1 {
    font-size: $font-size-h3;
  }
  h2 {
    font-size: $font-size-h4;
  }
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
