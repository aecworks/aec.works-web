<template>
  <div class="content" v-if="profile">
    <div class="page-header">
      <h2 class="page-title">{{profile.name}}</h2>

      <div>
        <label class="mt-1">Notifications</label>
        <input type="checkbox" /> Email
        <input type="checkbox" /> Text
        <label class="mt-1">Sign In As</label>
        <span>Github | Revoke</span>
      </div>
    </div>
  </div>
</template>

<script>
// import Avatar from '../components/Avatar.vue'
// import api from '@/api'
// import Discussion from '@/components/Discussion'
// import Hashtag from '@/components/Hashtag'

export default {
  name: 'Post',
  // components: { Avatar },
  props: {},
  data() {
    return {
      post: null,
    }
  },
  async created() {},
  methods: {},
  computed: {
    profile() {
      return this.$store.state.users.profile || null
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
