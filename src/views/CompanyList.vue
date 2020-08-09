<template>
  <div class="content">
    <div class="page">
      <div class="page-header">
        <div class="button">Add</div>
      </div>
      <div class="page-content">
        <CompanyCard
          v-for="(company, index) in items"
          :key="company.id"
          v-bind="{company}"
          v-waypoint="{ active: index + 1=== items.length, callback: onVisible }"
        />
      </div>
    </div>
    <div class="sidebar">
      <input class="fill-x" type="text" v-model="search" @input="handleSearchInput" />
      <HashtagList />
    </div>
  </div>
</template>

<script>
import api from '@/api'
import CompanyCard from '@/components/CompanyCard'
import HashtagList from '@/components/HashtagList'

export default {
  name: 'CompanyList',
  components: {
    CompanyCard,
    HashtagList,
  },
  data() {
    return {
      items: [],
      offset: 0,
      search: '',
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
    async fetchItems(offset, hashtag, search) {
      let query = { offset, hashtag, search }
      // Remove null/undefined
      query = Object.entries(query).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {})

      const { results: items } = await api.getCompanies(query)
      this.items = [...this.items, ...items]
      this.offset = this.offset + items.length
    },
    onVisible({ going }) {
      if (going === 'in') {
        this.fetchItems(this.offset)
      }
    },
    handleSearchInput() {
      this.items = []
      this.fetchItems(0, this.$route.query.hashtag, this.search)
    },
  },
}
</script>
