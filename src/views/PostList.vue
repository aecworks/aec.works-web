<template>
  <div class="page">

    <div class="page-header">
      <div class="button">Add Post</div>
    </div>

    <div class="page-content">
      <PostCard
        v-for="(post, index) in items"
        :key="post.id"
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
  name: 'CompanyList',
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
    this.fetchItems(0)
  },
  methods: {
    async fetchItems(offset) {
      const { results: items } = await api.getPosts({ offset })
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
