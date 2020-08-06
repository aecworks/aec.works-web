<template>
  <div class="page">
    <div class="page-header">
      <!-- <div class="button">Add</div> -->
      <router-link tag="div" class="button" :to="{name: 'PostCompose'}">Add</router-link>
    </div>

    <div class="page-content">
      <PostCard
        v-for="(post, index) in items"
        :key="post.slug"
        v-bind="{post}"
        v-waypoint="{ active: index + 1=== items.length, callback: onVisible }"
      />
    </div>
  </div>
</template>

<script>
import api from '@/api'
import PostCard from '@/components/PostCard'

export default {
  name: 'PostList',
  components: {
    PostCard,
  },
  data() {
    return {
      items: [],
      offset: 0,
    }
  },
  async created() {
    this.fetchItems(0, this.$route.query.hashtag)
  },
  beforeRouteUpdate(to, from, next) {
    if (from.query.hashtag !== to.query.hashtag) {
      this.items = []
      this.fetchItems(0, to.query.hashtag)
    }
    next()
  },
  methods: {
    async fetchItems(offset, hashtag) {
      const query = { offset }
      if (hashtag) {
        query.hashtag = hashtag
      }

      const { results: items } = await api.getPosts(query)
      this.items = [...this.items, ...items]
      this.offset = this.offset + items.length
    },
    onVisible({ going }) {
      if (going === 'in') {
        this.fetchItems(this.offset)
      }
    },
  },
}
</script>
