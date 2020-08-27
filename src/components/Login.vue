
<template>
  <Modal @clickOutside="$emit('closed')">
    <div class="login-container fill-y">
      <div class="login-info invert">
        <img alt="AEC Guide Logo" class="logo" src="@/assets/images/logo.svg" />
        <p class="center">Login to join the conversation.</p>
        <p class="center small mt-1">Terms of Use</p>
        <p class="center small mt-1">Everyone is welcome. Be nice.</p>
      </div>
      <div class="login-form">
        <!-- USE GITHUB ONLY -->
        <!-- <form class="form" autocomplete="off" @submit.prevent="handleFormSubmit">
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
        </form>-->
        <div class="login-form-social">
          <div class="button dark icon" @click="redirectGithubLogin()">
            <span class="icon">
              <img alt="Github Logo" class="button-icon" src="@/assets/images/github.svg" />
            </span>
            Login with Github
          </div>
          <div class="button dark blue icon" @click="redirectLinkedInLogin()">
            <span class="icon">
              <img alt="Github Logo" class="button-icon" src="@/assets/images/github.svg" />
            </span>
            Login with LinkedIn
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
import { githubAuthUrl, linkedinAuthUrl } from '../api/github'
import { popQuery } from '@/utils'
import Modal from '@/components/Modal'
import { USERS } from '@/store/users'

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
      const error = api.loginWithCredentials(this.email, this.password)
      if (!error) {
        this.$store.dispatch(USERS.GET_PROFILE)
      }
      popQuery(this.$router, this.$route.query, 'login')
    },
    async handleGithubCallback({ code, error }) {
      debugger
      if (error) {
        this.errors.push(error)
        return
      }

      if (code) {
        const error = await api.loginWithGithubCode(code)
        if (error) {
          this.errors = error
        } else {
          this.$store.dispatch(USERS.GET_PROFILE)
          popQuery(this.$router, this.$route.query, 'login')
          popQuery(this.$router, this.$route.query, 'code')
        }
      }
    },
    redirectGithubLogin() {
      window.location.href = githubAuthUrl()
    },
    redirectLinkedInLogin() {
      window.location.href = linkedinAuthUrl()
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

    align-items: center;
    justify-content: center;
    .login-form-social {
    }
  }
}
</style>
