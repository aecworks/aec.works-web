<template>
  <div id="app" class="wrapper">
    <img alt="AEC Guide Logo" class="logo" src="@/assets/images/logo-black.svg" />
    <h1 class="center">All good things come to an end</h1>
    <p class="center mt-2">
      <a href="https://github.com/gtalarico/aec-works-archive">data archive</a>
    </p>

    <a href="https://twitter.com/aec_works" class="center">
      <div class="">
        <br />
        <img alt="Twitter" src="@/assets/images/social-icons/twitter.svg" />
      </div>
      <!-- <div class="social-icon--text">Twitter</div> -->
    </a>

    <!-- <Nav />
    <Poopee />
    <SocialIcons />
    <transition name="fade" mode="out-in">
      <keep-alive include="CompanyList">
        <router-view />
      </keep-alive>
    </transition>
    <transition name="zoom" mode="out-in">
      <Login v-if="showLoginModal" @closed="$router.replace({ query: {} })" />
    </transition> -->
  </div>
</template>

<script>
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
        content: require('@/assets/images/logo-social-share.png'),
      },
      {
        name: 'twitter:card',
        content: 'summary',
        // content: 'summary_large_image',
      },
      {
        name: 'twitter:url',
        content: 'https://aec.works',
      },
      {
        name: 'twitter:site',
        content: '@aec_works',
      },
      {
        name: 'twitter:creator',
        content: '@gtalarico',
      },
      {
        name: 'twitter:title',
        vmid: 'twitter:title',
        template: (chunk) => `${chunk} | aec.works`,
      },
      {
        name: 'twitter:description',
        content: description,
      },
      {
        name: 'twitter:image',
        content: require('@/assets/images/logo-social-share.png'),
      },
    ],
  },
  components: {},
  data() {
    return {}
  },
  computed: {},
}
</script>

<style lang="scss">
@import '~@/assets/scss/main.scss';

.logo {
  height: 80px;
  margin-bottom: 1.5rem;
}
</style>
