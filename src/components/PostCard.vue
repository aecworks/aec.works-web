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
        <IconCounter :icon="'chat'" :count="post.threadSize" />
        <IconCounter
          :icon="'clap'"
          :count="localClapCount || post.clapCount"
          @click="onClapClick(post)"
        />
        <span class="small flex-right">{{relativeTimestamp}}</span>
      </div>
    </template>
  </Card>
</template>

<script>
import Card from './Card.vue'
import Avatar from './Avatar.vue'
import api from '@/api'
import { waitForLogin } from '@/mixins'
import Hashtag from '@/components/Hashtag'
import IconCounter from '@/components/IconCounter'
import moment from 'moment'

export default {
  name: 'PostCard',
  props: ['post'],
  components: { Hashtag, IconCounter, Avatar, Card },
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
    async onClapClick(post) {
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
