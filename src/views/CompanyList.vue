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
      <HashtagInput @changed="handleHashtagFilterChanged" :initialTags="initialQueryHashtags" />

      <p class="mt-1 sans small muted">Showing {{count}} {{count === 1 ? "company" : "companies"}}</p>

      <div class="mb-1">
        <Button v-if="userIsEditor" @click="handleAdd">Add Company</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { USERS } from '@/store/users'
import Button from '../components/forms/Button.vue'
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
      searchQuery: '',
      initialQueryHashtags: [],
    }
  },
  created() {
    if (this.hashtags) {
      this.initialQueryHashtags = this.hashtags.split(',').filter(i => i.length)
    }
    if (this.search) {
      this.searchQuery = this.search
    }
    this.fetchItems(0)
  },
  computed: {
    userIsEditor() {
      return this.$store.getters[USERS.IS_EDITOR]
    },
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
        hashtags: this.hashtags,
        search: this.searchQuery,
      }
      // Remove null/undefined
      query = Object.entries(query).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {})

      const { results, count } = await api.getCompanies(query)
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

    onVisible({ going }) {
      if (going === 'in' && this.hasMore) {
        this.fetchItems(this.offset)
      }
    },
  },
}
</script>
