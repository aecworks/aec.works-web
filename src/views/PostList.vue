<template>
  <div class="content">
    <div class="page">
      <div class="page-content">
        <Loader v-if="isLoading" />
        <PostEditComponent v-if="isEditing" @cancel="isEditing = false" />
        <PostCard
          v-for="(post, index) in items"
          :key="post.slug"
          v-bind="{post}"
          v-waypoint="{ active: index + 1=== items.length, callback: onVisible }"
        />
      </div>
    </div>
    <div class="sidebar">
      <TextInput
        icon="search"
        v-model="searchQuery"
        @input="handleSearchInput"
        placeholder="search"
      />
      <label class="mt-2">Hot This Week</label>
      <Hashtag slug="PropTech" clickable />
      <Hashtag slug="ADU" clickable />
      <Hashtag slug="Housing" clickable />

      <label class="mt-2">Contribute</label>
      <Icon icon="pencil" @click="handleAdd" clickable>Write</Icon>
      <label class="mt-2">Recent Comments</label>
    </div>
  </div>
</template>

<script>
import PostEditComponent from '../components/PostEditComponent.vue'
import Hashtag from '../components/Hashtag.vue'
import Icon from '../components/Icon.vue'
import TextInput from '../components/forms/TextInput.vue'
import Loader from '../components/Loader.vue'
import api from '@/api'
import PostCard from '@/components/PostCard'

export default {
  name: 'PostList',
  components: {
    PostCard,
    Loader,
    TextInput,
    Icon,
    Hashtag,
    PostEditComponent,
  },
  data() {
    return {
      items: [],
      offset: 0,
      isLoading: true,
      isEditing: false,
      searchQuery: '',
    }
  },
  async created() {
    await this.fetchItems(0, this.$route.query.hashtag)
    this.isLoading = false
  },
  beforeRouteUpdate(to, from, next) {
    if (from.query.hashtag !== to.query.hashtag) {
      this.items = []
      this.fetchItems(0, to.query.hashtag)
    }
    next()
  },
  methods: {
    async fetchItems(offset, hashtag, searchQuery) {
      // ?offset=0&hashtag=abc&search=xxx
      let query = { offset, hashtag, search: searchQuery }
      // Remove null/undefined
      query = Object.entries(query).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {})

      const { results: items } = await api.getPosts(query)
      this.items = [...this.items, ...items]
      this.offset = this.offset + items.length
    },
    handleSearchInput() {
      this.items = []
      this.fetchItems(0, this.$route.query.hashtag, this.searchQuery)
    },
    handleAdd() {
      this.isEditing = true
      // this.$router.push({ name: 'PostNew' })
    },
    onVisible({ going }) {
      // TODO: Make paginated loading util
      if (going === 'in') {
        this.fetchItems(this.offset)
      }
    },
  },
}
</script>
