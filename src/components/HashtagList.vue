<template>
  <div>
    <ul class="hashtag-list">
      <li v-for="hashtag in filteredHashtags" :key="hashtag.slug" class="hashtag-item">
        <Hashtag :slug="hashtag.slug" clickable @click="handleClick" />
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
  computed: {
    filteredHashtags() {
      return this.hashtags.slice(0, this.limit)
    },
    hasMore() {
      return this.limit < this.hashtags.length
    },
  },
  async created() {
    this.fetchItems()
  },
  methods: {
    async fetchItems() {
      const hashtags = await api.getHashtags()
      this.hashtags = hashtags.sort((a, b) => b.companyCount - a.companyCount)
    },
    handleMore() {
      this.limit += 5
    },
    handleClick(slug) {
      this.$emit('click', slug)
    },
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
