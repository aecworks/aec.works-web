<template>
  <div class="company-card" @click="onClick">
    <div class="company-card-icon">
      <img :src="getImageUrl(company.logo)" />
    </div>
    <div class="company-card-body">
      <h3 class="company-card-title">{{ company.name }}</h3>
      <p class="company-card-description">{{company.location || "-"}}</p>
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

<style lang="scss" scoped>


.company-card {
  position: relative;
  display: flex;
  flex: 1;
  padding-bottom: 3rem;
  cursor: pointer;

  .company-card-icon {
    margin-right: 1.5rem;
    width: 4rem;
    height: 4rem;
    flex-shrink: 0;
    overflow: hidden;

    border: 3px solid white;
    border-radius: 3px;
    box-shadow: .5rem .5em black;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

  }

  .company-card-body {
    display: flex;
    flex-direction: column;
    height: 4rem;

    .company-card-title {
        line-height: 2rem;
        margin-top: 0;
    }

    .company-card-description {
        @extend .muted;
    }
  }

}

</style>
