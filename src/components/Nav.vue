<template>
  <div id="nav" :class="{ 'expanded': navExpanded }">
    <!-- NAV HEADER -->
    <div class="flex fill-x">
      <div class="fill-x">
        <a href="/" class="hidden-sm">
          <img alt="AEC Works Logo" class="logo hidden-sm" src="@/assets/images/logo.svg" />
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
    <!-- NAV HEADER -->

    <ul class="nav-links">
      <li
        v-for="route in routes"
        :key="route.text"
        class="nav-item"
        :class="{'active': isActive(route)}"
      >
        <router-link tag="a" :to="{name: route.name}">{{route.text}}</router-link>
      </li>
    </ul>
    <div class="nav-profile-info">
      <span v-if="profile">Hello {{ profile.name.split(" ")[0] }}!</span>
      <!-- <router-link class="nav-item" tag="a" :to="{ name: 'Profile' }">profile</router-link> -->
      <!-- <router-link tag="a" :to="{ query: { login: '1' }}">login</router-link> -->
      <router-link tag="a" :to="{ name: 'logout' }">logout</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      navExpanded: false,
      routes: [
        { text: 'feed', name: 'PostList' },
        { text: 'companies', name: 'CompanyList' },
        // { text: 'people', name: 'PersonList' },
      ],
    }
  },
  computed: {
    profile() {
      return this.$store.state.users.profile || null
    },
  },
  methods: {
    isActive(route) {
      return this.$route.name === route.name
    },
  },
}
</script>

<style lang="scss" scoped>
#nav {
  border-bottom: 3px solid $yellow;
  @include for-large-up {
    border-bottom: none;
  }

  @include for-large-down {
    .nav-item {
      display: none;
    }
    &.expanded {
      .nav-item {
        display: block;
      }
      .profile-links {
        margin-bottom: 1rem;
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

  .nav-profile-info {
    font-size: $font-size-h5;
    display: none;
    @include for-large-up {
      display: inherit;
      margin-top: 5rem;
    }
  }

  .nav-item {
    text-align: right;
    margin-top: 1rem;
    margin-right: 3rem;

    @include for-large-up {
      margin-top: 0.5rem;
      text-align: left;
    }
    &.active {
      font-weight: $font-weight-bold;
      color: red;
    }
  }
}
</style>
