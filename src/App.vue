<template>
  <div id="app" class="app-wrapper">
    <Nav />
    <Poopee />
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

export default {
  name: 'App',
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Welcome',
    // all titles will be injected into this template
    titleTemplate: '%s | aec.works',
    htmlAttrs: {
      lang: 'en',
      amp: false,
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        property: 'og:type',
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
        content:
          'An open-source AEC community platform that promotes inclusive and enriching conversations through content-sharing and discussions.',
      },
      {
        property: 'og:image',
        content: './assets/images/meta.png',
      },
      {
        property: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        property: 'twitter:url',
        content: 'https://aec.works',
      },
      {
        property: 'twitter:title',
        vmid: 'twitter:title',
        template: (chunk) => `${chunk} | aec.works`,
      },
      {
        property: 'twitter:description',
        content:
          'An open-source AEC community platform that promotes inclusive and enriching conversations through content-sharing and discussions.',
      },
      {
        property: 'twitter:image',
        content: './assets/images/meta.png',
      },
    ],
  },
  components: {
    Nav,
    Login,
    Poopee,
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
