<template>
  <div>
    <label class="mb-1">
      <a :href="`https://twitter.com/${handle}`">Recent Tweets</a>
    </label>

    <Timeline
      :id="handle"
      source-type="profile"
      :options="{ tweetLimit: '3', chrome: 'noheader,noborders,nofooter,transparent', dnt: true }"
    >
      <Loader />
    </Timeline>
  </div>
</template>

<script>
import Loader from './Loader.vue'
import { Timeline } from 'vue-tweet-embed'

export default {
  name: 'TwitterFeed',
  components: { Loader, Timeline },
  props: ['handle'],
  data() {
    return {
      isLoading: true,
    }
  },
  computed: {},
  async created() {},
}
</script>

<style lang="scss"></style>
