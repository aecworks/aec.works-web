<template>
  <div class="wrapper">
    <div class="content">
      <div class="people-count">{{ items.length }} lovely people</div>
      <p v-for="profile in items" :key="profile.slug">
        <PeopleAvatar :profile="profile" />
      </p>
    </div>
    <div class="sidebar">
      <TextInput
        v-model="searchQuery"
        icon="search"
        placeholder="search"
        @input="handleSearchInput"
      />
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
      searchQuery: '',
    }
  },
  computed: {},
  async created() {
    const { results: items } = await api.getProfiles()
    this.items = items
  },
  methods: {
    refetch() {
      this.items = []
      this.fetchItems(0)
    },
    async fetchItems(offset) {
      let query = {
        offset,
        search: this.searchQuery,
      }
      query = query = Object.entries(query).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {})
      const { results, count } = await api.getProfiles(query)
      this.items = [...this.items, ...results]
      this.offset = this.offset + results.length
      this.count = count
    },
    handleSearchInput: debounce(function (query) {
      if (query) {
        this.$router.replace({ query: { ...this.$route.query, search: query } })
      } else {
        popQuery(this.$router, this.$route.query, 'search')
      }
      this.refetch()
    }, 200),
  },
}
</script>

<style lang="scss" scoped>
.people-count {
  font-size: 0.9rem;
  color: $dark-gray;
  margin: 1rem 0 1rem 0;
  @media only screen and (min-width: $lg) {
    margin-top: 0;
  }
}
</style>
