<template>
  <Card :show-image="false" :banner="post.banner">
    <template v-slot>
      <h2>
        <a href @click="goToPost(post)">{{ post.title }}</a>
      </h2>

      <p class="mt-1 post-text" v-html="truncatedBody"></p>

      <div>
        <Hashtag
          v-for="name in post.hashtags"
          :key="name"
          :slug="name"
          clickable
          @click="handleHashtagClick(name)"
        />
      </div>

      <Avatar class="mt-1" :profile="post.profile" />

      <div class="flex mt-2">
        <Icon :icon="'chat'" class="mr-1" clickable @click="handleChatIconClick(post)">
          <span class="small">{{ post.threadSize || 0 }}</span>
        </Icon>
        <Icon :icon="'clap'" clickable @click="handleClapClick(post)">
          <span class="small">{{ localClapCount || post.clapCount }}</span>
        </Icon>
        <span class="small flex-right">{{ post.createdAt | fromNow }}</span>
      </div>
    </template>
  </Card>
</template>

<script>
import api from '@/api'
import { waitForLogin } from '@/mixins'
import Avatar from '@/components/Avatar.vue'
import Card from '@/components/Card.vue'
import Hashtag from '@/components/Hashtag'
import Icon from '@/components/Icon.vue'

export default {
  name: 'PostCard',
  components: { Hashtag, Avatar, Card, Icon },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
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
      this.$emit('hashtagClick', name)
    },
    goToPost(post) {
      this.$router.push({ name: 'Post', params: { slug: post.slug } })
    },
    handleChatIconClick(post) {
      this.goToPost(post) // TODO: Anchor Comments
    },
    async handleClapClick(post) {
      await waitForLogin()
      switch (post.clapCount) {
        case 0:
          new Audio(require('@/assets/sounds/clap-surprise.mp3')).play()
          this.$ga.event({
            eventCategory: 'jokes',
            eventAction: 'surprise-sound-played',
          })
          break
        case 10:
          new Audio(require('@/assets/sounds/clap-loud.mp3')).play()
          break
        default:
          new Audio(require('@/assets/sounds/clap-fake.mp3')).play()
          break
      }
      const clapCount = await api.postPostClap(post.slug)
      this.localClapCount = clapCount
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"></style>
