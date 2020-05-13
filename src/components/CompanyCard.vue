<template>
  <div class="company-card" @click="onClick">
    <div class="company-card-icon-container">
      <div class="company-card-icon">
        <img :src="getImageUrl(company.logo)" />
      </div>
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
  padding-bottom: 3rem;
  cursor: pointer;
  display: flex;
  // flex: 1;
  justify-content: right;

  .company-card-icon-container {
    width: 200px;
    margin-right: 1.5rem;
    // display: flex;
    // justify-content: right;
  }
  .company-card-icon {
    display: inline-block;
    float: right;
    height: 75px;

    overflow: hidden;
    flex-shrink: 0;
    max-width: 150px;

    // border-radius: 3px;
    // border: 3px solid white;
    // box-shadow: 0.5rem 0.5em black;
    @extend .border-thin;
    @include shadow-color($dark);

    img {
      // width: 100%;
      height: 100%;
      object-fit: cover;
      // object-fit: fill;
      // object-fit: scale-down;
      object-position: center;
    }
  }

  .company-card-body {
    height: 4rem;
    // flex-direction: column;
    // display: flex;

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
