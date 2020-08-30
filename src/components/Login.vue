<template>
  <Modal @clickOutside="$emit('closed')">
    <div class="login-container">
      <div class="login-loader flex flex-center flex-center-vertical" v-if="isLoading">
        <div>
          <Loader />
        </div>
      </div>
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
        <div class="login-form-social flex flex-down">
          <div class="button dark icon" @click="oauthRedirect('github')">
            <span class="icon">
              <img alt="Github Logo" class="button-icon" src="@/assets/images/github.svg" />
            </span>
            Login with Github
          </div>
          <div class="button linkedin icon" @click="oauthRedirect('linkedin')">
            <span class="icon">
              <img alt="Linkedin Logo" class="button-icon" src="@/assets/images/linkedin-login.svg" />
            </span>
            Login with LinkedIn
          </div>
          <div v-for="(value, name) in errors" :key="name">
            <div>
              <!-- <p class="small muted">{{value}}</p> -->
            </div>
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
import Loader from './Loader.vue'
import api from '../api'
import { oauthLoginUrl, callbackUrl } from '../api/oauth'
import { popQueries } from '@/utils'
import Modal from '@/components/Modal'
import { USERS } from '@/store/users'

export default {
  name: 'Login',
  components: { Modal, Loader },
  props: [],
  data() {
    return {
      email: '',
      password: '',
      errors: [],
      isLoading: false,
    }
  },
  mounted() {
    this.handleOauthCallback(this.$route.query)
  },
  methods: {
    async handleFormSubmit() {
      const error = api.loginWithCredentials(this.email, this.password)
      if (!error) {
        this.$store.dispatch(USERS.GET_PROFILE)
      }
      popQueries(this.$router, this.$route.query, ['login'])
    },
    async handleOauthCallback(query) {
      const { code, error, provider } = query

      if (error) {
        this.errors.push(error)
        console.log(error)
        return
      }

      if (code) {
        this.isLoading = true
        const redirectUri = callbackUrl(provider)
        const responseErrors = await api.loginWithOauthCode(provider, code, redirectUri)
        this.isLoading = false

        if (responseErrors) {
          this.errors.push(responseErrors)
          console.log(responseErrors)
        } else {
          this.$store.dispatch(USERS.GET_PROFILE)
          popQueries(this.$router, this.$route.query, ['state', 'provider', 'login', 'code'])
        }
      }
    },
    buildState(provider) {
      return JSON.stringify({
        provider: provider,
        route: { path: this.$route.path, query: this.$route.query },
      })
    },
    oauthRedirect(provider) {
      this.isLoading = true
      const state = this.buildState(provider)
      window.location.href = oauthLoginUrl(provider, state)
    },
  },
}
</script>

<style lang="scss" scoped>
// TODO: Clean this mess up

.login-container {
  display: flex;
  flex-direction: column;
  position: relative;

  @include for-large-up {
    flex-direction: row;
  }

  > * {
    padding: 3rem 1.5rem;
  }

  .login-loader {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: $cream;
    opacity: 1;
  }

  .login-info {
    @include for-large-up {
      // flex-basis: 50%;
    }
    display: flex;
    flex-direction: column;
    .logo {
      margin-bottom: 1.5rem;
    }
  }
  .login-form {
    @include for-large-up {
      // flex-basis: 25%;
    }

    display: flex;
    // flex-direction: column;

    align-items: center;
    justify-content: center;
    .login-form-social {
      .button {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
