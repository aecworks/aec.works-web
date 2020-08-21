<template>
  <!-- <Card @click="handleClick(company)"> -->
  <Card>
    <template v-slot:logo>
      <img class="company-logo" v-if="company.logo" :src="getImageUrl(company.logo)" />
    </template>
    <template v-slot:cover>
      <img v-if="company.cover" :src="getImageUrl(company.cover)" />
    </template>
    <template v-slot:default>
      <!-- Company Name -->
      <h2 class="mt-1">
        <router-link :to="{ name: 'Company', params: { slug: company.slug } }">{{company.name}}</router-link>
      </h2>

      <!-- Company Description -->
      <p class="mt-1">{{company.description || "-"}}</p>

      <!-- Company Hashtags -->
      <div class="mt-1">
        <Hashtag v-for="slug in company.hashtags" :slug="slug" :key="slug" />
      </div>

      <!-- Footer -->
      <div class="flex mt-1">
        <Icon :icon="'chat'">
          <span class="small">5</span>
        </Icon>
        <Icon :icon="'clap'" clickable>
          <span class="small">5</span>
        </Icon>
        <span class="small flex-right">{{company.location}}</span>
      </div>
    </template>
  </Card>
</template>

<script>
import Icon from './Icon.vue'
import Card from './Card.vue'
import Hashtag from '@/components/Hashtag'

export default {
  name: 'CompanyCard',
  props: ['company'],
  components: { Hashtag, Card, Icon },
  // created() {
  //   window.addEventListener('scroll', this.handleScroll)
  // },
  // destroyed() {
  //   window.removeEventListener('scroll', this.handleScroll)
  // },
  methods: {
    handleClick(company) {
      this.$router.push({ name: 'Company', params: { slug: company.slug } })
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
.company-logo {
  position: absolute;
  right: 30px;
  bottom: -30px;
  width: 60px;
  height: 60px;
  @extend .border-thick;
}
</style>
