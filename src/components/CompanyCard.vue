<template>
  <!-- <Card @click="handleClick(company)"> -->
  <Card data-cy="company-card">
    <template v-slot:logo>
      <LazyImg v-if="company.logoUrl" class="company-logo" :src="getImageUrl(company.logoUrl)" />
    </template>
    <template v-slot:cover>
      <LazyImg v-if="company.coverUrl" :src="getImageUrl(company.coverUrl)" />
    </template>
    <template v-slot:default>
      <!-- Company Name -->
      <h2 class="mt-1">
        <!-- TODO throwing router error -->
        <router-link :to="{ name: 'Company', params: { slug: company.slug || '?' } }">
          {{ company.name }}
        </router-link>
      </h2>

      <!-- Company Description -->
      <p class="mt-1">{{ company.description || '-' }}</p>

      <!-- Company Hashtags -->
      <div class="mt-1">
        <Hashtag
          v-for="slug in company.hashtags"
          :key="slug"
          :slug="slug"
          clickable
          @click="$emit('hashtag-click', slug)"
        />
      </div>

      <!-- Footer -->
      <div class="flex mt-1">
        <Icon :icon="'chat'" class="mr-1">
          <span class="small">{{ company.threadSize }}</span>
        </Icon>
        <Icon :icon="'clap'" clickable @click="handleClapClick(company)">
          <span class="small">{{ localClapCount || company.clapCount }}</span>
        </Icon>
        <span class="small flex-right">{{ company.location }}</span>
      </div>
    </template>
  </Card>
</template>

<script>
import api from '@/api'
import { waitForLogin } from '@/mixins'
import Icon from '@/components/Icon.vue'
import Card from '@/components/Card.vue'
import Hashtag from '@/components/Hashtag'
import LazyImg from '@/components/LazyImg'

export default {
  name: 'CompanyCard',
  components: { LazyImg, Hashtag, Card, Icon },
  props: {
    company: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localClapCount: null,
    }
  },
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
    async handleClapClick(company) {
      await waitForLogin()
      const clapCount = await api.postCompanyClap(company.slug)
      this.localClapCount = clapCount
    },
  },
}
</script>

<style lang="scss" scoped>
.company-logo {
  position: absolute;
  right: 50px;
  bottom: -50px;
  width: 80px;
  height: 80px;
  @extend .border-thin;
  // Custom:
  border-radius: 5px;
  border-color: $dark-gray;
  border-width: 1px;
  box-shadow: 0 5px 10px -10px rgba(0, 0, 0, 0.25);
  background-color: white;
}
</style>
