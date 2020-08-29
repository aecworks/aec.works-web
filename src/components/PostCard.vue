<template>
  <Card :showImage="false" :banner="post.banner">
    <template v-slot>
      <h2>
        <a href @click="goToPost(post)">{{post.title}}</a>
      </h2>

      <p class="mt-1 post-text" v-html="truncatedBody"></p>

      <div>
        <Hashtag
          v-for="name in post.hashtags"
          :slug="name"
          :key="name"
          @click="handleHashtagClick(name)"
          clickable
        />
      </div>

      <Avatar class="mt-1" :profile="post.profile" />

      <div class="flex mt-2">
        <Icon :icon="'chat'" class="mr-1" @click="handleChatIconClick(post)" clickable>
          <span class="small">{{post.threadSize || 0}}</span>
        </Icon>
        <Icon :icon="'clap'" @click="handleClapClick(post)" clickable>
          <span class="small">{{localClapCount || post.clapCount}}</span>
        </Icon>
        <span class="small flex-right">{{post.createdAt | fromNow}}</span>
      </div>
    </template>
  </Card>
</template>

<script>
import api from '@/api'
import { waitForLogin } from '@/mixins'
import { toggleHashtag } from '@/mixins'
import Avatar from '@/components/Avatar.vue'
import Card from '@/components/Card.vue'
import Hashtag from '@/components/Hashtag'
import Icon from '@/components/Icon.vue'

export default {
  name: 'PostCard',
  props: ['post'],
  components: { Hashtag, Avatar, Card, Icon },
  data() {
    return {
      localClapCount: null,
    }
  },
  computed: {
    truncatedBody() {
      return this.post.body.length < 100 ? this.post.body : this.post.body.slice(0, 120) + '...'
    },
  },
  methods: {
    async handleHashtagClick(name) {
      toggleHashtag(name)
    },
    goToPost(post) {
      this.$router.push({ name: 'Post', params: { slug: post.slug } })
    },
    handleChatIconClick(post) {
      this.goToPost(post) // TODO: Anchor Comments
    },
    async handleClapClick(post) {
      const sound = new Audio(require('@/assets/sounds/effect.mp3'))
      if (Math.random() > 0.8) sound.play()
      await waitForLogin()
      const clapCount = await api.postPostClap(post.slug)
      this.localClapCount = clapCount
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
