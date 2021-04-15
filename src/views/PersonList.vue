<template>
  <div class="wrapper">
    <div class="content">
      <div v-for="profile in items" :key="profile.slug">
        <PeopleAvatar :profile="profile" />
      </div>
      <a v-if="hasMore" @click="handleLoadMore">load more</a>
    </div>
    <div class="sidebar">
      <TextInput
        v-model="searchQuery"
        icon="search"
        placeholder="search"
        @input="handleSearchInput"
      />
      <div class="mt-1 sans small muted">{{ count }} lovely people</div>
    </div>
  </div>
</template>

<script>
import api from '../api'
import TextInput from '../components/forms/TextInput.vue'
import PeopleAvatar from '@/components/PeopleAvatar'
import { popQuery, debounce } from '@/utils'

export default {
  name: 'PersonList',
  metaInfo: {
    title: 'People',
  },
  components: { PeopleAvatar, TextInput },
  data() {
    return {
      items: [],
      count: 0,
      searchQuery: '',
    }
  },
  computed: {
    hasMore() {
      return this.items.length < this.count
    },
  },
  async created() {
    this.fetchItems(0)
  },
  methods: {
    refetch() {
      this.items = []
      this.fetchItems(0)
    },
    handleLoadMore() {
      this.fetchItems(this.items.length)
    },
    async fetchItems(offset) {
      let query = {
        offset,
        search: this.searchQuery,
      }
      query = query = Object.entries(query).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {})
      const { results, count } = await api.getProfiles(query)

      this.items = [...this.items, ...results]
      this.count = count
    },
    handleSearchInput: debounce(function (query) {
      if (query) {
        this.$router.replace({ query: { ...this.$route.query, search: query } })
      } else {
        popQuery(this.$router, this.$route.query, 'search')
      }
      this.refetch()
    }, 100),
  },
}
</script>

<style lang="scss" scoped></style>
