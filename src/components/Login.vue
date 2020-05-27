
<template>
  <Modal @clickOutside="$emit('closed')">
    <div class="login-container fill-y">
      <div class="login-info invert">
        <img alt="AEC Guide Logo" class="logo hidden-sm" src="@/assets/images/logo.svg" />
        <p>Welcome to our AEC Community</p>
        <p>Sign in to contribute and participate.</p>
        <p class="muted">Terms.</p>
      </div>
      <div class="login-form">
        <form class="form" autocomplete="off" @submit.prevent="handleFormSubmit">
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
          <div class="button dark icon" @click="redirectGithubLogin()">
            <span class="icon">
              <img alt="Github Logo" class="button-icon" src="@/assets/images/github.svg" />
            </span>
            Login with Github
          </div>
        </div>
        <!-- TODO Signup -->
        <!-- <p>Don't have an account?</p> -->
        <!-- <div class="button">Signup</div> -->

        <!-- TODO FORMAT -->
        <p v-for="err in errors" :key="err">{{err}}</p>
      </div>
    </div>
  </Modal>
</template>

<script>
import api from '../api'
import { githubAuthUrl } from '../api/github'
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
    this.handleGithubCallback(this.$route.query)
  },
  methods: {
    async handleFormSubmit() {
      const error = api.login(this.email, this.password)
      if (!error) {
        this.$store.dispatch('getProfile')
      }
      popQuery(this.$router, this.$route.query, 'login')
    },
    async handleGithubCallback({ code, error }) {
      if (error) {
        this.errors.push(error)
        return
      }

      if (code) {
        const error = await api.githubLogin(code)
        if (error) {
          this.errors = error
        } else {
          this.$store.dispatch('getProfile')
          popQuery(this.$router, this.$route.query, 'login')
          popQuery(this.$router, this.$route.query, 'code')
        }
      } else {
        throw 'unexpected github response'
      }
    },
    redirectGithubLogin() {
      window.location.href = githubAuthUrl()
    },
  },
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;

  @include for-large-up {
    flex-direction: row;
  }

  > * {
    padding: 3rem 1.5rem;
  }

  .login-info {
    @include for-large-up {
      flex-basis: 50%;
    }
    display: flex;
    flex-direction: column;
    .logo {
      margin-bottom: 1.5rem;
    }
  }
  .login-form {
    @include for-large-up {
      flex-basis: 50%;
    }

    display: flex;
    flex-direction: column;
    .login-form-social {
      margin-top: 1rem;
    }
  }
}
</style>
