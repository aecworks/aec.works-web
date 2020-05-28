<template>
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
</template>

<script>
import api from '@/api'
import CompanyCard from '@/components/CompanyCard'

export default {
  name: 'CompanyList',
  components: {
    CompanyCard,
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
      const { results: items } = await api.getCompanies({ offset })
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
