<template>
  <div id="app" class="app-wrapper">
    <Nav />
    <Poopee />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <transition name="zoom" mode="out-in">
      <Login v-if="showLoginModal" @closed="$router.replace({query:{}})" />
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
