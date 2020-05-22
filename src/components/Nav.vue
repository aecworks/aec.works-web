<template>
  <div id="nav" :class="{ 'expanded': navExpanded }">
    <div class="flex fill-x">
      <div class="fill-x">
        <a href="/" class="hidden-sm">
          <img alt="AEC Guide Logo" class="logo hidden-sm" src="@/assets/images/logo.svg" />
        </a>
      </div>
      <div class="hidden-lg">
        <button
          class="hamburger hamburger--squeeze"
          :class="{'is-active': navExpanded}"
          @click="navExpanded = !navExpanded"
          type="button"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </div>

    <!-- <router-link to="/">Home</router-link> | -->
    <ul class="nav-links">
      <router-link
        v-for="route in routes"
        :key="route.text"
        tag="li"
        class="nav-item"
        :class="{'active': isActive(route)}"
        :to="route.path"
      >{{route.text}}</router-link>
    </ul>
    <ul class="profile-links">
      <router-link class="nav-item" tag="li" :to="{ name: 'Profile' }">profile</router-link>
      <router-link class="nav-item" tag="li" :to="{ query: { login: '1' }}">login</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      navExpanded: false,
      routes: [
        { text: 'feed', path: '/posts' },
        { text: 'companies', path: '/companies' },
        { text: 'people', path: '/people' },
      ],
    }
  },
  computed: {
    profile() {
      return this.$store.state.users.profile || {}
    },
  },
  methods: {
    isActive(route) {
      return this.$route.path.includes(route.path)
    },
  },
}
</script>

<style lang="scss" scoped>
#nav {
  border-bottom: 3px solid $yellow;
  @include for-large-up {
    border-bottom: none;
    padding-top: 6rem;
  }

  @include for-large-down {
    .nav-item {
      display: none;
    }
    &.expanded {
      .nav-item {
        display: block;
      }
    }
  }

  .logo {
    @include for-large-up {
      height: 4rem;
    }
  }

  .nav-links {
    @include for-large-up {
      padding-top: 2rem;
    }
  }

  .nav-item {
    margin-bottom: 0.5rem;
    text-align: center;
    @include for-large-up {
      text-align: left;
    }
    &.active {
      font-weight: $font-weight-bold;
    }
  }
}
</style>
