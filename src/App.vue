<template>
  <div id="app" class="app-wrapper">
    <Nav />
    <router-view />

    <p>
      <a href="#" @click="showModal = true">Login</a>
    </p>

    <!-- Modals -->
    <Modal v-if="showModal" @on-close="showModal = false">
      <div class="form">
        <input class="form-text" type="text" placeholder="username" />
        <input class="form-text" type="text" placeholder="username" />
      </div>
    </Modal>
    <!-- Modals -->
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Modal from '@/components/Modal'

export default {
  name: 'App',
  components: {
    Nav,
    Modal,
  },
  data() {
    return {
      showModal: false,
    }
  },
  computed: {
    // ?modal=login
    loginModal() {
      return this.$route.query.modal
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/scss/main.scss';
</style>
