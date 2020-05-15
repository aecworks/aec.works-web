
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
        <form class="form" autocomplete="off" @submit.prevent="onSubmit">
          <label>Username</label>
          <input
            class="fill-x"
            type="text"
            v-model="username"
            name="username"
            :placeholder="usernames[0]"
          />
          <label>Password</label>
          <input class="fill-x" type="text" v-model="password" name="username" placeholder="****" />
          <div class="button">Login</div>
          <input type="submit" value="Submit" />
        </form>
        <br />
        <p>Don't have an account?</p>
        <div class="button">Signup</div>
        <a
          href="https://github.com/login/oauth/authorize?scope=user:email&client_id=6d6767eb4dcc89d70f99"
        >Github</a>
      </div>
    </div>
  </Modal>
</template>

<script>
import { login } from '@/api/auth'
import Modal from '@/components/Modal'

export default {
  name: 'Login',
  components: { Modal },
  props: [],
  data() {
    return {
      username: '',
      password: '',
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
  methods: {
    onSubmit() {
      login(this.username, this.password)
    },
  },
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
