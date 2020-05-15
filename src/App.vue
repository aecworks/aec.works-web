<template>
  <div id="app" class="app-wrapper">
    <Nav />
    <router-view />

    <p>
      <router-link :to="{query: { login: '1' }}">Login</router-link>
    </p>

    <Login v-if="showLoginModal" @closed="$router.replace({query:{}})" />
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Login from '@/components/Login'

export default {
  name: 'App',
  components: {
    Nav,
    Login,
  },
  data() {
    return {
      // showLoginModal: false,
    }
  },
  methods: {},
  computed: {
    // ?modal=login
    showLoginModal() {
      return this.$route.query.login
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/scss/main.scss';
</style>
