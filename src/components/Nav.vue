<template>
  <div id="nav-container" :class="{ 'expanded': navExpanded }">
    <div id="nav" class="flex">
      <a href="/" class>
        <img alt="AEC Works Logo" class="logo" src="@/assets/images/logo-black.svg" />
      </a>
      <ul class="nav-list flex fill-x">
        <li v-for="route in routes" :key="route.text" class="nav-item">
          <router-link
            tag="a"
            :class="{'active': isActive(route)}"
            :to="{name: route.name}"
          >{{route.text}}</router-link>
        </li>
        <li class="nav-item flex-right" v-if="profile">
          <router-link
            tag="a"
            :to="{name: 'Person', params: { slug: profile.slug }}"
          >{{profile.name}}</router-link>
          <a href="#" @click="handleLogout()">logout</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { USERS } from '@/store/users'

export default {
  name: 'Nav',
  data() {
    return {
      navExpanded: false,
      routes: [
        { text: 'feed', name: 'PostList' },
        { text: 'companies', name: 'CompanyList' },
        // { text: 'profile', name: 'Profile' },
        // { text: 'people', name: 'PersonList' },
      ],
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.header = document.getElementById('nav-container')
    this.sticky = this.header.offsetTop
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
    handleLogout() {
      this.$store.dispatch(USERS.LOGOUT)
    },
    handleScroll(event) {
      if (window.pageYOffset > this.sticky) {
        this.header.classList.add('sticky')
      } else {
        this.header.classList.remove('sticky')
      }
    },
  },
}
</script>

<style lang="scss">
#nav-container {
  z-index: 1;
  background-color: white;

  border-bottom: 1px solid white;
  transition: border 400ms;

  .logo {
    height: 64px;
    margin-right: 1.5rem;
  }

  &.sticky {
    border-bottom: 1px solid $light-gray;
    box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.25);
  }

  .nav-list {
    align-items: center;

    .nav-item {
      height: 100%;
      display: inline-block;
      line-height: 50px;
      padding: 0 2rem;
      a {
        font-family: $font-family;
        text-decoration: none;
        font-weight: $font-weight-bold;
        padding-bottom: 2px;
        transition: border 200ms;
        border-bottom: 2px solid transparent;
        &.active {
          border-bottom: 2px solid $dark;
        }
        &:hover:not(.active) {
          border-bottom: 2px solid $light-gray;
        }
      }
    }
  }
}
.sticky + .content {
  // padding-top: 100px;
}
</style>
