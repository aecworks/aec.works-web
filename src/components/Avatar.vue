<template>
  <div @click="handleClick()" class="profile flex flex-center">
    <img
      class="profile-avatar"
      src="https://pbs.twimg.com/profile_images/1160338085235707904/NMNIRutH_400x400.jpg"
    />
    <span class="profile-name">{{profile.name}}</span>
  </div>
</template>

<script>
export default {
  name: 'Hashtag',
  props: ['profile'],
  methods: {
    onClick() {
      this.$router.push({ name: 'Person', params: { slug: this.profile.id } })
    },
  },
}
</script>

<style lang="scss" scoped>
.profile {
  cursor: pointer;
  .profile-avatar {
    width: 32px;
    height: 32px;
    @extend .border-thin;
    @include shadow-color($yellow);
  }

  .profile-name {
    margin-left: 1rem;
  }
}
</style>
