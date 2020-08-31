<template>
  <div class="wrapper">
    <div class="content">
      <Loader v-if="isLoading" />
      <CompanyCard
        v-for="(company, index) in items"
        :key="company.id"
        v-bind="{company}"
        v-waypoint="{ active: index + 1=== items.length, callback: onVisible }"
        @hashtagClick="handleHashtagClick"
      />
    </div>
    <div class="sidebar">
      <TextInput
        icon="search"
        v-model="searchQuery"
        @input="handleSearchInput"
        placeholder="search"
      />
      <label class="mt-1">Hashtags</label>
      <HashtagInput @changed="handleHashtagFilterChanged" />

      <p class="mt-1 sans small muted">Showing {{count}} {{count === 1 ? "company" : "companies"}}</p>

      <div class="mb-1">
        <Icon v-if="true" class="mt-2" icon="pencil" @click="handleAdd" clickable>Add Company</Icon>
      </div>
    </div>
  </div>
</template>

<script>
import HashtagInput from '../components/forms/HashtagInput.vue'
import Icon from '../components/Icon.vue'
import Loader from '../components/Loader.vue'
import TextInput from '../components/forms/TextInput.vue'
import api from '@/api'
import CompanyCard from '@/components/CompanyCard'
import { toggleHashtag } from '../mixins'
import { popQuery } from '@/utils'
import { bus, EVENTS } from '@/events'

export default {
  name: 'CompanyList',
  components: {
    CompanyCard,
    TextInput,
    Loader,
    Icon,
    HashtagInput,
  },
  data() {
    return {
      items: [],
      offset: 0,
      count: 0,
      isLoading: true,
      searchQuery: '',
    }
  },
  async created() {
    this.fetchItems(0)
    this.isLoading = false
  },
  // beforeRouteUpdate(to, from, next) {
  // if (from.query.hashtag !== to.query.hashtag) {
  //   this.items = []
  //   this.fetchItems(0, [])
  // }
  //   // next()
  // },
  computed: {
    hasMore() {
      return this.count > this.items.length
    },
  },
  methods: {
    refetch() {
      this.items = []
      this.fetchItems(0)
    },
    async fetchItems(offset) {
      let query = {
        offset,
        hashtags: this.$route.query.hashtags,
        search: this.searchQuery,
      }
      // Remove null/undefined
      query = Object.entries(query).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {})

      const { results, count } = await api.getCompanies(query)
      this.items = [...this.items, ...results]
      this.offset = this.offset + results.length
      this.count = count
    },

    handleSearchInput(query) {
      if (query) {
        this.$router.replace({ query: { ...this.$route.query, search: query } })
      } else {
        popQuery(this.$router, this.$route.query, 'search')
      }
      this.refetch()
    },

    handleHashtagFilterChanged(tags) {
      if (tags.length) {
        const hashtagStr = tags.join(',')
        this.$router.replace({ query: { ...this.$route.query, hashtags: hashtagStr } })
      } else {
        popQuery(this.$router, this.$route.query, 'hashtags')
      }
      this.refetch()
    },

    handleHashtagClick(slug) {
      bus.$emit(EVENTS.HASHTAG_CLICKED, slug)
    },

    handleAdd() {
      this.$router.push({ name: 'CompanyNew' })
    },

    onVisible({ going }) {
      if (going === 'in' && this.hasMore) {
        this.fetchItems(this.offset)
      }
    },
  },
}
</script>
