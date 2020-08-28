
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
        </div>

        <!-- TODO Signup -->
        <!-- <p>Don't have an account?</p> -->
        <!-- <div class="button">Signup</div> -->

        <!-- TODO FORMAT -->
        <div v-for="err in errors" :key="err">
          <span class="small muted">{{err}}</span>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import api from '../api'
import { githubAuthUrl, linkedinAuthUrl } from '../api/oauth'
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
    this.handleOauthCallback(this.$route.query)
  },
  methods: {
    async handleFormSubmit() {
      const error = api.loginWithCredentials(this.email, this.password)
      if (!error) {
        this.$store.dispatch(USERS.GET_PROFILE)
      }
      popQuery(this.$router, this.$route.query, 'login')
    },
    async handleOauthCallback(query) {
      const { code, error, provider } = query

      if (error) {
        this.errors.push(error)
        return
      }

      if (code) {
        const loginError = await api.loginWithOauthCode(provider, code)

        if (loginError) {
          this.errors.push(loginError)
        } else {
          this.$store.dispatch(USERS.GET_PROFILE)
          popQuery(this.$router, this.$route.query, 'state')
          popQuery(this.$router, this.$route.query, 'provider')
          popQuery(this.$router, this.$route.query, 'login')
          popQuery(this.$router, this.$route.query, 'code')
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
      const state = this.buildState(provider)
      switch (provider) {
        case 'github':
          window.location.href = githubAuthUrl(state)
          break
        case 'linkedin':
          window.location.href = linkedinAuthUrl(state)
          break
      }
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
      .button {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
