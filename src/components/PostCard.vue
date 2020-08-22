<template>
  <Card :showImage="false">
    <template v-slot>
      <h2>
        <router-link :to="{ name: 'Post', params: { slug: post.slug }}">{{post.title}}</router-link>
      </h2>

      <p class="mt-1 post-text" v-html="post.body.slice(0, 120) + '...'"></p>

      <div>
        <Hashtag v-for="slug in post.hashtags" :slug="slug" :key="slug" />
      </div>

      <Avatar class="mt-1" :profile="post.profile" />

      <div class="flex mt-2">
        <Icon :icon="'chat'">
          <span class="small">{{post.threadSize}}</span>
        </Icon>
        <Icon :icon="'clap'" @click="handleClapClick(post)" clickable>
          <span class="small">{{localClapCount || post.clapCount}}</span>
        </Icon>
        <span class="small flex-right">{{relativeTimestamp}}</span>
      </div>
    </template>
  </Card>
</template>

<script>
import Icon from './Icon.vue'
import Card from './Card.vue'
import Avatar from './Avatar.vue'
import api from '@/api'
import { waitForLogin } from '@/mixins'
import Hashtag from '@/components/Hashtag'
import moment from 'moment'

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
    relativeTimestamp() {
      return moment(this.post.createdAt).fromNow()
    },
  },
  methods: {
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
