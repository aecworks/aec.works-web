<template>
  <div class="profile mb-2 flex flex-center">
    <LazyImg class="profile-avatar" :src="avatarImg" />
    <div class="small">
      <h3 class="profile-name" @click="handleClick()">{{ profile.name }}</h3>
      <div class="profile-location">{{ profile.location }}</div>
      <div v-if="profile.bio" class="profile-bio">
        {{ truncateString(profile.bio, bioLength) }}
      </div>
      <div v-else class="profile-bio">
        {{ profile.bio }}
      </div>
    </div>
  </div>
</template>

<script>
import LazyImg from '@/components/LazyImg'
export default {
  name: 'Hashtag',
  components: {
    LazyImg,
  },
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    if (window.matchMedia('(max-width: 575px)').matches) {
      return {
        bioLength: 40,
      }
    }
    if (window.matchMedia('(min-width: 576px) and (max-width: 767px').matches) {
      return {
        bioLength: 50,
      }
    }
    if (window.matchMedia('(min-width: 768px) and (max-width: 991px').matches) {
      return {
        bioLength: 105,
      }
    }
    if (window.matchMedia('(min-width: 992px)').matches) {
      return {
        bioLength: 70,
      }
    }
  },
  computed: {
    avatarImg() {
      return this.profile.avatarUrl || require('@/assets/images/avatar.svg')
    },
  },
  methods: {
    handleClick() {
      this.$router.push({ name: 'Person', params: { slug: this.profile.slug } })
    },
    truncateString(text, maxLength) {
      let index = text.indexOf(' ', maxLength)
      return index === -1 ? text : text.substring(0, index) + '...'
    },
  },
}
</script>

<style lang="scss" scoped>
.profile {
  .profile-avatar {
    width: 60px;
    height: 60px;
    // border: 1px solid $dark;
    border-radius: 30px;
    border: 2px solid $yellow;
    padding: 2px;
  }
  .profile-name {
    cursor: pointer;
    margin-left: 0.75rem;
    font-family: $font-family;
    &:hover {
      text-decoration: underline;
    }
  }

  .profile-location,
  .profile-bio {
    font-family: $font-family;
    font-weight: $font-weight-normal;
    font-size: $font-size-h5;
    margin-left: 12px;
  }
}
</style>
