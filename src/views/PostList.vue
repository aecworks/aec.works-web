<template>
  <div class="wrapper">
    <div class="content">
      <Loader v-if="isLoading" />
      <PostEditComponent v-if="isEditing" @cancel="isEditing = false" />
      <PostCard
        v-for="(post, index) in items"
        :key="post.slug"
        v-bind="{post}"
        v-waypoint="{ active: index + 1=== items.length, callback: onVisible }"
        @hashtagClick="handleHashtagClick"
      />
      <p v-if="!isLoading && !items.length">Someone is going crazy with the filters <span class="emoji"> 🤷‍♀️</span></p>
    </div>

    <div class="sidebar">
      <TextInput
        icon="search"
        v-model="searchQuery"
        @input="handleSearchInput"
        placeholder="search"
      />
      <div class="mt-2">
        <label>Hashtags</label>
        <HashtagList @click="handleHashtagClick"/>
      </div>
      <div class="mt-2 mb-2">
        <Icon class="mt" icon="pencil" v-if="!isEditing" @click="handleAdd" clickable>Write</Icon>
      </div>
    </div>
  </div>
</template>

<script>
import HashtagList from '../components/HashtagList.vue'
import PostEditComponent from '../components/PostEditComponent.vue'
import Icon from '../components/Icon.vue'
import TextInput from '../components/forms/TextInput.vue'
import Loader from '../components/Loader.vue'
import api from '@/api'
import PostCard from '@/components/PostCard'
import { popQuery, filterNullKeys, debounce } from '@/utils'
import { waitForLogin } from '@/mixins'
import { toggleHashtag } from '@/utils'

export default {
  name: 'PostList',
  components: {
    PostCard,
    Loader,
    TextInput,
    Icon,
    PostEditComponent,
    HashtagList,
  },
  props: {
    search: {
      type: String,
      default: '',
    },
    hashtags: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      items: [],
      offset: 0,
      count: 0,
      isLoading: true,
      isEditing: false,
      searchQuery: '',
    }
  },
  async created() {
    await this.refetch()
    this.isLoading = false
  },
  computed: {
    hasMore() {
      return this.count > this.items.length
    },
  },
  methods: {
    refetch() {
      this.isLoading = true
      this.items = []
      this.fetchItems(0)
    },
    async fetchItems(offset) {
      let query = {
        offset,
        hashtags: this.hashtags,
        search: this.searchQuery,
      }
      query = filterNullKeys(query)
      const { results, count } = await api.getPosts(query)
      this.items = [...this.items, ...results]
      this.offset = this.offset + results.length
      this.count = count
      this.isLoading = false
    },
    handleSearchInput: debounce(function(query) {
      if (query) {
        this.$router.replace({ query: { ...this.$route.query, search: query } })
      } else {
        popQuery(this.$router, this.$route.query, 'search')
      }
      this.refetch()
    }, 200),
    handleHashtagClick(slug) {
      toggleHashtag(this.$router, slug)
      this.$nextTick(() => this.refetch())
    },
    async handleAdd() {
      await waitForLogin()
      this.isEditing = true
    },
    onVisible({ going }) {
      // TODO: Make paginated loading util
      if (going === 'in' && this.hasMore) {
        this.fetchItems(this.offset)
      }
    },
  },
}
</script>
