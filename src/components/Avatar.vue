<template>
  <div class="profile flex flex-center">
    <img class="profile-avatar" :src="avatarImg" />
    <span @click="handleClick()" class="small profile-name">{{profile.name}}</span>
  </div>
</template>

<script>
export default {
  name: 'Hashtag',
  props: ['profile'],
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
    width: 34px;
    height: 34px;
    border-radius: 17px;
    border: 1px solid $yellow;
    padding: 3px;
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
