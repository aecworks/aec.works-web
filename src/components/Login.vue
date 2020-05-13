
<template>
  <Modal @clickOutside="$emit('closed')">
    <div class="login-container fill-y">
      <div class="login-info invert">
        <img alt="AEC Guide Logo" class="logo" src="@/assets/logo.svg" />
        <p>
          Welcome to our AEC Community. To keep things in order, users must be signed in
          to contribute and dicuss.
        </p>
      </div>
      <div class="login-form">
        <form class="form" autocomplete="off">
          <label>Username</label>
          <input class="fill-x" type="text" name="username" :placeholder="usernames[0]" />
          <label>Password</label>
          <input class="fill-x" type="text" name="username" placeholder="****" />
          <div class="button">Login</div>
        </form>
        <br />
        <p>Don't have an account?</p>
        <div class="button">Signup</div>
      </div>
    </div>
  </Modal>
</template>

<script>
// import api from '@/api'
import Modal from '@/components/Modal'

export default {
  name: 'Login',
  components: { Modal },
  props: [],
  data() {
    return {
      usernames: [
        'herpes_free_since_03',
        'king_0f_dairy_queen',
        'shaquille_oatmeal',
        'intelligent_zombie',
        'average_student',
        'butt_smasher',
        'forgotmypants',
        'how_you_doing',
      ],
    }
  },
  created() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  > * {
    padding: 3rem 1.5rem;
  }
  .login-info {
    flex-basis: 50%;

    display: flex;
    flex-direction: column;
    .logo {
      margin-bottom: 1.5rem;
    }
  }
  .login-form {
    flex-basis: 50%;
  }
}
</style>
