<template>
  <div id="app" class="app-wrapper">
    <Nav />
    <Poopee />
    <SocialIcons />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <transition name="zoom" mode="out-in">
      <Login v-if="showLoginModal" @closed="$router.replace({ query: {} })" />
    </transition>
  </div>
</template>

<script>
import Poopee from './components/Poopee.vue'
import Nav from '@/components/Nav'
import Login from '@/components/Login'
import SocialIcons from '@/components/SocialIcons'

const description =
  'aec.works is a curated list of innovative and product-oriented aec companies and startups'

export default {
  name: 'App',
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'aec.works',
    // all titles will be injected into this template
    titleTemplate: '%s | aec.works',
    htmlAttrs: {
      lang: 'en',
      amp: false,
    },
    meta: [
      {
        property: 'description',
        content: description,
        // Also at sidebar, /about, github.com/aecworks, and twitter
      },
      {
        property: 'keywords',
        content: 'aec,startups,technology,architecture,engineering,construction,design',
      },
      {
        keywords: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://aec.works',
      },
      {
        property: 'og:title',
        vmid: 'og:title',
        template: (chunk) => `${chunk} | aec.works`,
      },
      {
        property: 'og:description',
        content: description,
      },
      {
        property: 'og:image',
        content: require('@/assets/images/logo-color-200.png'),
      },
      {
        property: 'twitter:card',
        content: 'summary',
      },
      {
        property: 'twitter:url',
        content: 'https://aec.works',
      },
      {
        property: 'twitter:site',
        content: '@aec_works',
      },
      {
        property: 'twitter:creator',
        content: '@gtalarico',
      },
      {
        property: 'twitter:title',
        vmid: 'twitter:title',
        template: (chunk) => `${chunk} | aec.works`,
      },
      {
        property: 'twitter:description',
        content: description,
      },
      {
        property: 'twitter:image',
        content: require('@/assets/images/logo-color-200.png'),
      },
    ],
  },
  components: {
    Nav,
    Login,
    Poopee,
    SocialIcons,
  },
  data() {
    return {}
  },
  computed: {
    showLoginModal() {
      return this.$route.query.login
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/scss/main.scss';
</style>
