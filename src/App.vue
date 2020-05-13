<template>
  <div id="app" class="app-wrapper">
    <Nav />
    <router-view />

    <p>
      <a href="#" @click="showLoginModal = true">Login</a>
    </p>

    <Login v-if="showLoginModal" @closed="showLoginModal = false" />
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
      showLoginModal: false,
    }
  },
  computed: {
    // ?modal=login
    // loginModal() {
    //   return this.$route.query.modal
    // },
  },
}
</script>

<style lang="scss">
@import '~@/assets/scss/main.scss';
</style>
