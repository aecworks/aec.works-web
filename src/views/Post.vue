<template>
  <div class="wrapper sm-grid-sidebar-down" v-if="post">
    <div class="content mb-2">
      <h1>{{ post.title }}</h1>
      <Avatar v-if="true" :profile="post.profile" />
      <p class="post-content mt-2" v-html="post.body" />

      <div>
        <Hashtag v-for="slug in post.hashtags" :slug="slug" :key="slug" />
      </div>
    </div>

    <div class="sidebar">
      <div>
        <Icon icon="clap" @click="handleClap(post)" clickable>{{
          localClapCount || post.clapCount
        }}</Icon>
      </div>
      <div class="mt-1">
        <Icon icon="chat">{{ post.threadSize || 0 }}</Icon>
      </div>

      <div class="mt-2">
        <label>Share</label>
        <SocialShare />
      </div>

      <div class="mt-2" v-if="isAuthor">
        <label>Author</label>
        <Icon icon="pencil" @click="handleEdit" clickable>Edit</Icon>
      </div>
    </div>
    <div class="footer">
      <Discussion :threadId="post.threadId" />
    </div>
  </div>
</template>

<script>
import SocialShare from '../components/SocialShare.vue'
import Icon from '../components/Icon.vue'
import api from '@/api'
import { waitForLogin } from '@/mixins'
import Discussion from '@/components/Discussion'
import Hashtag from '@/components/Hashtag'
import Avatar from '@/components/Avatar'

export default {
  name: 'Post',
  metaInfo() {
    const post = this.post
    return {
      title: () => (post && post.title ? post.title : 'Feed'),
    }
  },
  components: { Discussion, Hashtag, Avatar, Icon, SocialShare },
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
    async handleClap(post) {
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
