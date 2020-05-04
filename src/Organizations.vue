<template>
  <div id="app">
    <div v-for="org in organizations" :key="org.id">
      <CompanyCase v-bind="{org}" />
    </div>
  </div>
</template>

<script>
import CompanyCase from '@/components/CompanyCard'
import api from '@/api'

export default {
  name: 'App',
  components: {
    CompanyCase,
  },
  data() {
    return {
      organizations: ['a'],
    }
  },
  async created() {
    const { items } = await api.getPages()
    this.organizations = items
  },
}
</script>

<style>
</style>
