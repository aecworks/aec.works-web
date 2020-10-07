<template>
  <div class="profile flex flex-center">
    <LazyImg class="profile-avatar" :src="avatarImg" />
    <span class="small profile-name" @click="handleClick()">
      {{ profile.name }}
    </span>
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
  computed: {
    avatarImg() {
      return this.profile.avatarUrl || require('@/assets/images/avatar.svg')
    },
  },
  methods: {
    handleClick() {
      this.$router.push({ name: 'Person', params: { slug: this.profile.slug } })
    },
  },
}
</script>

<style lang="scss" scoped>
.profile {
  .profile-avatar {
    width: 30px;
    height: 30px;
    // border: 1px solid $dark;
    border-radius: 17px;
    border: 1px solid $yellow;
    padding: 2px;
  }

  .profile-name {
    cursor: pointer;
    margin-left: 0.75rem;
    font-family: $font-family-serif;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
