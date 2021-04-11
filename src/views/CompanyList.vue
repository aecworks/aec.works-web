<template>
  <div class="wrapper">
    <div class="content">
      <Loader v-if="isLoading" />
      <CompanyCard
        v-for="company in items"
        :key="company.id"
        v-bind="{ company }"
        @hashtagClick="handleHashtagClick"
      />
      <Pagination v-if="items.length" :num-pages="numPages" @click="handlePageClick"></Pagination>
      <p class="mt-1 sans small muted">
        Showing Page {{ $route.query.page || 1 }} of {{ numPages }} ({{ count }}
        {{ count === 1 ? 'company' : 'companies' }})
      </p>
    </div>
    <div class="sidebar">
      <TextInput
        v-model="searchQuery"
        icon="search"
        placeholder="search"
        @input="handleSearchInput"
      />
      <label class="mt-1">Hashtags</label>
      <HashtagInput :initial-tags="initialQueryHashtags" @changed="handleHashtagFilterChanged" />

      <!-- TODO see all hashtags -->
      <div v-if="false" class="mt-1">
        <Button :kind="'text'">See All Hashtags</Button>
      </div>

      <div class="mt-2">
        <Button v-if="userIsEditor" @click="handleAdd">Add Company</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { USERS } from '@/store/users'
import Button from '../components/forms/Button.vue'
import Pagination from '../components/Pagination.vue'
import HashtagInput from '../components/forms/HashtagInput.vue'
import Loader from '../components/Loader.vue'
import TextInput from '../components/forms/TextInput.vue'
import api from '@/api'
import CompanyCard from '@/components/CompanyCard'
import { popQuery, debounce } from '@/utils'
import { bus, EVENTS } from '@/events'
import { waitForLogin } from '@/mixins'

export default {
  name: 'CompanyList',
  metaInfo: {
    title: 'Companies',
  },
  components: {
    CompanyCard,
    TextInput,
    Loader,
    HashtagInput,
    Button,
    Pagination,
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
      PAGE_SIZE: 10,
      numPages: 1,
      hasMore: false,
      count: 0,
      items: [],
      isLoading: true,
      searchQuery: '',
      initialQueryHashtags: [],
    }
  },
  computed: {
    userIsEditor() {
      return this.$store.getters[USERS.IS_EDITOR]
    },
  },
  created() {
    if (this.hashtags) {
      this.initialQueryHashtags = this.hashtags.split(',').filter((i) => i.length)
    }
    if (this.search) {
      this.searchQuery = this.search
    }
    const pageNumber = this.$route.query.page || 1
    this.fetchItems(pageNumber)
  },
  methods: {
    refetch() {
      this.$router.replace({ query: { ...this.$route.query, page: 1 } })
      this.items = []
      this.fetchItems(0)
    },

    async fetchItems(pageNumber) {
      this.items = []
      this.isLoading = true
      let query = {
        page: pageNumber,
        hashtags: this.hashtags,
        search: this.searchQuery,
      }
      // Remove null/undefined
      query = Object.entries(query).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {})

      const { results, count, next } = await api.getCompanies(query)
      this.numPages = Math.ceil(count / this.PAGE_SIZE)
      this.items = results
      this.count = count
      this.hasMore = next !== null
      this.isLoading = false

      if (this.hasMore) {
        // Preload Next
        query.page = Number(pageNumber) + 1
        api.getCompanies(query)
      }
    },

    handleSearchInput: debounce(function (query) {
      if (query) {
        this.$router.replace({ query: { ...this.$route.query, search: query } })
      } else {
        popQuery(this.$router, this.$route.query, 'search')
      }
      this.refetch()
    }, 200),

    handleHashtagFilterChanged(tags) {
      if (tags.length) {
        const hashtagStr = tags.join(',')
        this.$router.replace({ query: { ...this.$route.query, hashtags: hashtagStr } })
      } else {
        popQuery(this.$router, this.$route.query, 'hashtags')
      }
      this.$nextTick(() => this.refetch())
    },

    handleHashtagClick(slug) {
      bus.$emit(EVENTS.HASHTAG_CLICKED, slug)
    },

    async handleAdd() {
      await waitForLogin()
      this.$router.push({ name: 'CompanyNew' })
    },

    handlePageClick(pageNumber) {
      this.$router.replace({ query: { ...this.$route.query, page: pageNumber } })
      this.fetchItems(pageNumber)
    },
  },
}
</script>
