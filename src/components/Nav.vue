<template>
  <div id="nav" class="flex" :class="{ 'expanded': navExpanded }">
    <a href="/" class>
      <img alt="AEC Works Logo" class="logo" src="@/assets/images/logo-black.svg" />
    </a>
    <ul class="nav-list">
      <li v-for="route in routes" :key="route.text" class="nav-item">
        <router-link
          tag="a"
          :class="{'active': isActive(route)}"
          :to="{name: route.name}"
        >{{route.text}}</router-link>
      </li>
    </ul>
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
        // { text: 'people', name: 'PersonList' },
      ],
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.header = document.getElementById('nav')
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
#nav {
  z-index: 1;
  background-color: white;
  border-bottom: 1px solid white;
  margin-top: 32px;

  height: 150px;
  padding: 30px 30px;

  .logo {
    transition: margin-left 300ms;
    height: 64px;
    margin-left: 0;
    margin-right: 1.5rem;
  }

  transition: border 400ms;

  &.sticky {
    height: 75px;
    margin-top: 0;
    position: fixed;
    top: 0;
    border-bottom: 1px solid $light-gray;
    padding: 10px 10px;
    .logo {
      margin-left: -200px;
    }
    .nav-list {
      margin-left: 0;
    }
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
  padding-top: 185px;
}
</style>
