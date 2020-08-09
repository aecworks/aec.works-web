<template>
  <div>
    <ul class="hashtag-list">
      <li class="hashtag-item" v-for="hashtag in hashtags" :key="hashtag.slug">
        <Hashtag :slug="hashtag.slug" />
      </li>
    </ul>
  </div>
</template>

<script>
import Hashtag from '@/components/Hashtag'
import api from '@/api'

export default {
  name: 'HashtagList',
  components: {
    Hashtag,
  },
  data() {
    return {
      hashtags: [],
    }
  },
  async created() {
    this.fetchItems()
  },
  methods: {
    async fetchItems() {
      const hashtags = await api.getHashtags()
      this.hashtags = [...this.hashtags, ...hashtags]
    },
  },
}
</script>

<style lang="scss">
.hashtag-list {
  text-align: right;
}
// .hashtag-item {
//  justify-contents: right;
// }
</style>
