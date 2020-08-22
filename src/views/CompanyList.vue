<template>
  <div class="content">
    <div class="page">
      <div class="page-content">
        <Loader v-if="isLoading" />
        <CompanyCard
          v-for="(company, index) in items"
          :key="company.id"
          v-bind="{company}"
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
      <Icon icon="pencil" @click="handleAdd" clickable>Add Company</Icon>
    </div>
  </div>
</template>

<script>
import Icon from '../components/Icon.vue'
import Loader from '../components/Loader.vue'
import TextInput from '../components/forms/TextInput.vue'
import api from '@/api'
import CompanyCard from '@/components/CompanyCard'

export default {
  name: 'CompanyList',
  components: {
    CompanyCard,
    TextInput,
    Loader,
    Icon,
  },
  data() {
    return {
      items: [],
      offset: 0,
      isLoading: true,
      searchQuery: '',
    }
  },
  async created() {
    this.fetchItems(0, this.$route.query.hashtag)
    this.isLoading = false
  },
  // mounted() {
  // },
  // destroyed() {
  // },
  beforeRouteUpdate(to, from, next) {
    if (from.query.hashtag !== to.query.hashtag) {
      this.items = []
      this.fetchItems(0, to.query.hashtag)
    }
    next()
  },
  methods: {
    async fetchItems(offset, hashtag, searchQuery) {
      let query = { offset, hashtag, search: searchQuery }
      // Remove null/undefined
      query = Object.entries(query).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {})

      const { results: items } = await api.getCompanies(query)
      this.items = [...this.items, ...items]
      this.offset = this.offset + items.length
    },
    onVisible({ going }) {
      if (going === 'in') {
        this.fetchItems(this.offset, this.$route.query.hashtag, this.searchQuery)
      }
    },
    handleSearchInput() {
      this.items = []
      this.fetchItems(0, this.$route.query.hashtag, this.searchQuery)
    },
    handleAdd() {
      this.$router.push({ name: 'CompanyNew' })
    },
  },
}
</script>
