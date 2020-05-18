
<template>
  <Modal @clickOutside="$emit('closed')">
    <div class="login-container fill-y">
      <div class="login-info invert">
        <img alt="AEC Guide Logo" class="logo" src="@/assets/images/logo.svg" />
        <p>
          Welcome to our AEC Community. To keep things in order, users must be signed in
          to contribute and dicuss.
        </p>
      </div>
      <div class="login-form">
        <form class="form" autocomplete="off" @submit.prevent="onSubmit">
          <label>Email</label>
          <input
            class="fill-x"
            type="text"
            v-model="email"
            name="email"
            placeholder="name@domain.com"
          />
          <label>Password</label>
          <input class="fill-x" type="text" v-model="password" name="username" placeholder="****" />
          <button class="button" type="submit">Login</button>
        </form>
        <div class="login-form-social">
          <div class="button dark icon" @click="githubLogin()">
            <span class="icon">
              <img alt="Github Logo" class="button-icon" src="@/assets/images/github.svg" />
            </span>
            Login with Github
          </div>
        </div>
        <!-- TODO Signup -->
        <!-- <p>Don't have an account?</p> -->
        <!-- <div class="button">Signup</div> -->
      </div>
    </div>
  </Modal>
</template>

<script>
import { loginWithCredentials, loginWithGithubCallback, githubAuthUrl } from '@/api/auth'
import { popQuery } from '@/utils'
import Modal from '@/components/Modal'

export default {
  name: 'Login',
  components: { Modal },
  props: [],
  data() {
    return {
      email: '',
      password: '',
      errors: [],
    }
  },
  mounted() {
    const { code, error } = this.$route.query
    if (code) {
      const success = loginWithGithubCallback(code)
      if (success) {
        popQuery(this.$router, this.$route.query, 'login')
        popQuery(this.$router, this.$route.query, 'code')
      }
    }
    if (error) {
      this.errors.push(error)
      // this.$router.replace({query: null})
    }
  },
  methods: {
    async onSubmit() {
      const success = loginWithCredentials(this.email, this.password)
      if (success) {
        popQuery(this.$router, this.$route.query, 'login')
      }
    },
    githubLogin() {
      // Send User to Github Auth
      window.location.href = githubAuthUrl()
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

    display: flex;
    flex-direction: column;
    .login-form-social {
      margin-top: auto;
    }
  }
}
</style>
