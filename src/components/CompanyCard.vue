<template>
  <!-- <Card @click="handleClick(company)"> -->
  <Card :banner="company.banner">
    <template v-slot:logo>
      <RouterLink v-if="company.logoUrl" :to="routerLinkTo">
        <LazyImg class="company-logo" :src="getImageUrl(company.logoUrl)" />
      </RouterLink>
    </template>
    <template v-slot:cover>
      <RouterLink v-if="company.coverUrl" :to="routerLinkTo">
        <LazyImg :src="getImageUrl(company.coverUrl)" />
      </RouterLink>
    </template>
    <template v-slot:default>
      <!-- Company Name -->
      <h2 class="mt-1">
        <!-- TODO throwing router error -->
        <router-link :to="routerLinkTo">
          {{ company.name }}
        </router-link>
      </h2>

      <!-- Company Description -->
      <p class="mt-0">{{ company.description || '-' }}</p>

      <!-- Company Hashtags -->
      <div class="mt-0">
        <Hashtag
          v-for="slug in company.hashtags"
          :key="slug"
          :slug="slug"
          clickable
          @click="$emit('hashtagClick', slug)"
        />
      </div>

      <!-- Footer -->
      <div class="flex mt-1">
        <Icon :icon="company.threadSize ? 'chat' : 'chat_off'" class="mr-1">
          <span class="small">{{ company.threadSize }}</span>
        </Icon>
        <Icon
          :icon="company.userDidClap ? 'clap' : 'clap_off'"
          icon-hover="clap"
          clickable
          @click="handleClapClick(company)"
        >
          <span class="small">{{ company.clapCount }}</span>
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
import { clapForCount } from '@/libs/sounds'

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
    return {}
  },
  computed: {
    routerLinkTo() {
      return { name: 'Company', params: { slug: this.company.slug || '?' } }
    },
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
      // Refactor, duplicated in Company
      await waitForLogin()
      const clapCount = await api.postCompanyClap(company.slug)
      company.clapCount = clapCount
      company.userDidClap = true
      clapForCount(clapCount)
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
  background-color: white;
  @extend .border-soft;
}
</style>
