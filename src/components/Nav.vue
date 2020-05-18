<template>
  <div id="nav">
    <a href="/">
      <img alt="AEC Guide Logo" class="logo" src="@/assets/images/logo.svg" />
    </a>
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
    <!-- TEMPORARY -->
    <br />
    <br />
    <router-link :to="{query: { login: '1' }}">Login</router-link>
    <!-- TEMPORARY -->
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      routes: [
        { text: 'feed', path: '/posts' },
        { text: 'companies', path: '/companies' },
        { text: 'people', path: '/people' },
      ],
    }
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
  @include for-large-up {
    padding-top: 6rem;
  }

  .logo {
    height: 4rem;
  }

  .nav-links {
    @include for-large-up {
      padding-top: 2rem;
    }
  }

  .nav-item {
    cursor: pointer;
    margin-bottom: 0.5rem;
    &.active {
      font-weight: $font-weight-bold;
    }
  }
}
</style>
