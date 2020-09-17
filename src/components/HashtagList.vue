<template>
  <div>
    <ul class="hashtag-list">
      <li class="hashtag-item" v-for="hashtag in filteredHashtags" :key="hashtag.slug">
        <Hashtag :slug="hashtag.slug" @click="handleClick" clickable/>
      </li>
    </ul>
    <Button kind="text" @click="handleMore">Show More"</Button>
  </div>
</template>

<script>
import Button from './forms/Button.vue'
import Hashtag from '@/components/Hashtag'
import api from '@/api'

export default {
  name: 'HashtagList',
  components: {
    Hashtag,
    Button,
  },
  data() {
    return {
      hashtags: [],
      limit: 5,
    }
  },
  async created() {
    this.fetchItems()
  },
  computed: {
    filteredHashtags() {
      return this.hashtags.slice(0, this.limit)
    },
    hasMore() {
      return this.limit < this.hashtags.length
    },
  },
  methods: {
    async fetchItems() {
      const hashtags = await api.getHashtags()
      this.hashtags = hashtags.sort((a, b) => b.postCount - a.postCount)
    },
    handleMore() {
      this.limit += 5
    },
    handleClick(slug) {
      this.$emit('click', slug)
    }
  },
}
</script>

<style lang="scss">
.hashtag-list {
  .hashtag-item {
    display: inline-block;
  }
}
</style>
