<template>
  <div>
    <Loader v-if="isLoading" />
    <div class="tweet mt-2" v-for="tweet in feed" :key="tweet.id">
      <div class="flex header">
        <div class="avatar">
          <img :src="tweet.user.profileImageUrl" />
        </div>
        <div class="ml-1">
          <h4>{{tweet.createdAt | calendar }}</h4>
        </div>
      </div>
      <div class="body">
        <p class="sans small">
          <a
            :href="`https://twitter.com/${tweet.user.screenName}/status/${tweet.idStr}`"
          >{{tweet.text}}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from './Loader.vue'
import api from '@/api'

export default {
  name: 'TwitterFeed',
  components: { Loader },
  data() {
    return {
      feed: [],
      isLoading: true,
    }
  },
  props: ['handle'],
  computed: {},
  async created() {
    this.feed = await api.getTwitterTimeline(this.handle)
    this.isLoading = false
  },
}
</script>

<style lang="scss" scoped>
.feed-title {
  span {
    // padding-left: 12px;
  }
}
.tweet {
  .header {
    line-height: 32px;
    vertical-align: middle;
  }
  .avatar {
    min-width: 32px;

    img {
      height: 32px;
      @extend .border-thin;
      @include shadow-color($dark);
    }
  }

  .body {
    padding-left: 50px;
  }
}
</style>
