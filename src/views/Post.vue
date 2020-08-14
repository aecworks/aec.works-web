<template>
  <div class="content" v-if="post">
    <div class="page">
      <div class="page-header">
        <h1 class="page-title">{{post.title}}</h1>
        <Avatar class="mt-2" v-if="true" :profile="post.profile" />
      </div>

      <p class="post-content" v-html="post.body" />

      <div>
        <Hashtag v-for="slug in post.hashtags" :slug="slug" :key="slug" />
      </div>

      <Discussion :threadId="post.thread" />
    </div>
    <div class="sidebar">
      <IconCounter
        :icon="'clap'"
        :count="localClapCount || post.clapCount"
        @click="onClapClick(post)"
      />Share
      <div class="post-actions">
        <button v-if="isAuthor" class="button" @click="handleEdit">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { waitForLogin } from '@/mixins'
import Discussion from '@/components/Discussion'
import Hashtag from '@/components/Hashtag'
import Avatar from '@/components/Avatar'
import IconCounter from '@/components/IconCounter'

export default {
  name: 'Post',
  components: { Discussion, Hashtag, Avatar, IconCounter },
  props: {
    slug: { required: true, type: String },
  },
  data() {
    return {
      post: null,
      localClapCount: null,
    }
  },
  async created() {
    this.post = await api.getPost(this.slug)
  },
  computed: {
    isAuthor() {
      const profile = this.$store.state.users.profile
      return profile && profile.slug && profile.slug === this.post.profile.slug
    },
  },
  methods: {
    handleEdit() {
      this.$router.push({ name: 'PostEdit', params: { slug: this.slug } })
    },
    async onClapClick(post) {
      await waitForLogin()
      const clapCount = await api.postPostClap(post.slug)
      this.localClapCount = clapCount
    },
  },
}
</script>

<style lang="scss">
.post-content {
  font-family: $font-family-serif;

  // HACK
  img {
    max-width: 100% !important;
  }
  // Editor Tweaks
  h1 {
    font-size: $font-size-h2;
  }
  h2 {
    font-size: $font-size-h3;
  }
}
</style>
