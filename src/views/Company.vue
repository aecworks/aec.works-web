<template>
  <div class="page">
    <div v-if="company">
      <div class="page-header">
        <h2 class="page-title">{{ company.name }}</h2>
        <img
          class="page-icon"
          src="https://pbs.twimg.com/profile_images/1150588363503570944/tfnBg-3D_400x400.png"
        />
      </div>
      <div>
        <p>{{ company.description }}</p>
        <p>Website: {{ company.website }}</p>
        <p>Employees: {{ company.employee_count }}</p>
        <p>Founded: {{ company.founded_date }}</p>
        <p>Twitter: {{ company.twitter }}</p>
        <p>Headquarter: {{ company.headquarter }}</p>
      </div>
      <Discussion :threadId="company.commentThread" />
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Discussion from '@/components/Discussion'

export default {
  name: 'Company',
  components: { Discussion },
  props: ['id'],
  data() {
    return {
      errors: [],
      company: null,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const response = await api.getCompany(this.id)
      if (!response.message) {
        this.company = response
      } else {
        this.errors.push(response.message)
      }
    },
  },
}
</script>
