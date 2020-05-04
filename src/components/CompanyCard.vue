<template>
  <div class="card" @click="onClick">
    <div class="card-icon">
      <img :src="getImageUrl(company.logo)" />
    </div>
    <div class="card-body">
      <h3 class="card-title">{{ company.name }}</h3>
      <p class="card-description">{{company.location || "-"}}</p>
    </div>
  </div>
</template>

<script>
import { API_URL } from '@/api'

export default {
  name: 'CompanyCard',
  props: ['company'],
  methods: {
    onClick() {
      this.$router.push({
        name: 'Company',
        params: { id: this.company.id },
      })
    },
    getImageUrl(logo) {
      if (logo) {
        return logo
      } else {
        return 'https://api.adorable.io/avatars/285/abott@adorable.png'
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
