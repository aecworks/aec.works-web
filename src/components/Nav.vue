<template>
  <div id="nav-container" :class="{ 'expanded': navExpanded }">
    <div id="nav" class="flex">
      <a href="/" class="nav-logo hidden-sm">
        <img alt="AEC Works Logo" src="@/assets/images/logo-black.svg" />
      </a>
      <ul class="nav-list">
        <li v-for="route in routes" :key="route.text" class="nav-item">
          <router-link
            tag="a"
            :class="{'active': isActive(route)}"
            :to="{name: route.name}"
          >{{route.text}}</router-link>
          <span class="ml muted small">{{route.label}}</span>
        </li>
        <li class="nav-item profile" v-if="profile">
          <span class="nav-profile-avatar">
            <router-link tag="a" :to="{name: 'Person', params: { slug: profile.slug }}">
              <img :src="profile.avatarUrl" alt="avatar" />
            </router-link>
            <!-- <a class="ml-1" href="#" @click="handleLogout()">logout</a> -->
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { USERS } from '@/store/users'
import { debounce } from '@/utils'

export default {
  name: 'Nav',
  data() {
    return {
      navExpanded: false,
      routes: [
        { text: 'companies', name: 'CompanyList' },
        { text: 'feed', name: 'PostList', label: '( beta )' },
        { text: 'people', name: 'PersonList' },
      ],
    }
  },
  mounted() {
    window.addEventListener('scroll', debounce(this.handleScroll, 10))
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
  background-color: white;
  border-bottom: 1px solid white;
  transition: border 150ms, height 150ms, padding 150ms;
  z-index: 2;

  .nav-logo {
    transition: transform 200ms;
    img {
      height: 60px;
      margin-right: 1.5rem;
    }
  }
  &.sticky {
    border-bottom: 1px solid $light-gray;
    box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.25);
    height: 60px;
    padding: 0.2rem 0;

    .nav-logo {
      animation-name: animatelogo;
      animation-duration: 300ms;
      transform: translateY(-75px);
      width: 0;
    }
    @keyframes animatelogo {
      0% {
        transform: translateY(0);
        width: 60px;
      }
      100% {
        transform: translateY(-75px);
        width: 0;
      }
    }
    // img {
    // }
  }

  .nav-list {
    @include for-large-up {
      width: 100%;
      display: flex;
    }

    .nav-item {
      height: 100%;
      display: inline-block;
      line-height: 50px;
      padding: 0 1rem;
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
      &.profile {
        @include for-large-up {
          margin-left: auto;
          margin-right: 0;
        }
        a:hover {
          text-decoration: none;
          border-bottom: none;
        }
      }
      .nav-profile-avatar {
        img {
          vertical-align: middle;
          display: inline-block;
          @extend .border-thin;
          border-radius: 12px;
          height: 24px;
        }
      }
    }
  }
}
.sticky + .content {
  // padding-top: 100px;
}
</style>
