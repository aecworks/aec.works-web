<template>
  <div class="post-card">
    <h3 class="post-card-title">
      <router-link :to="{ name: 'Post', params: { id: post.id }}">{{post.title}}</router-link>
    </h3>
    <p class="post-card-author">by {{ post.profile.name }}</p>

    <div class="post-card-hashtags">
      <Hashtag v-for="name in post.hashtags" :name="name" :key="name" />
    </div>

    <div class="post-card-footer flex flex-center">
      <IconCounter :icon="'chat'" :count="post.commentCount" />
      <IconCounter
        :icon="'clap'"
        :count="localClapCount || post.clapCount"
        @click="onClapClick(post)"
      />
      <label class="post-card-footer-timestamp">{{relativeTimestamp}}</label>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Hashtag from '@/components/Hashtag'
import IconCounter from '@/components/IconCounter'
import moment from 'moment'

export default {
  name: 'PostCard',
  props: ['post'],
  components: { Hashtag, IconCounter },
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
      if (!this.$store.getters.isLoggedIn) {
        this.$router.push({ query: { login: 1 } })
      } else {
        const clapCount = await api.postPostClap(post.id)
        this.localClapCount = clapCount
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.post-card {
  display: inline-block;
  width: 10rem;
  margin-bottom: 2rem;
  padding: $padding;

  @extend .border-thick;
  @include shadow-color($dark);

  width: 100%;
  @include for-large-up {
    width: 80%;
  }

  .post-card-title {
    margin-bottom: 0.5rem;
  }

  .post-card-author {
    margin-bottom: 1rem;
  }

  .post-card-hashtags {
    margin-bottom: 1rem;
  }

  .post-card-footer {
    display: flex;
    > * {
      margin-right: 1rem;
    }
    .post-card-footer-timestamp {
      margin-left: auto;
    }
  }
}
</style>
