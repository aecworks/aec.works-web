<template>
  <div id="app" class="app-wrapper">
    <Nav />
    <router-view />
    <Login v-if="showLoginModal" @closed="$router.replace({query:{}})" />
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Login from '@/components/Login'
import api from '@/api'
import { USERS } from '@/store/users'

export default {
  name: 'App',
  components: {
    Nav,
    Login,
  },
  data() {
    return {}
  },
  created() {
    this.$store.dispatch(USERS.GET_PROFILE)
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
