<template>
  <div class="wrapper">
    <div class="content">
      <div v-if="profile" class="profile">
        <div>
          <div class="profile-image">
            <img :src="profile.avatarUrl" />
          </div>
          <h2 class="mt-1">{{ profile.name }}</h2>

          <label class="mt-2">Location</label>
          <p class="sans">{{ profile.location }}</p>

          <label class="mt-1">About</label>
          <p class="sans">{{ profile.bio }}</p>

          <!-- TODO Make Social Media Component -->
          <label class="mt-1">Social</label>
          <div class="mt">
            <Icon icon="twitter" clickable></Icon>
            <Icon icon="linkedin" clickable></Icon>
          </div>
        </div>
        <div class="profile-activity">
          <h2>Activity</h2>TODO
          <h2 class="mt-2">Posts</h2>TODO
        </div>
      </div>
    </div>
    <div class="sidebar hidden-sm">
      <label>Share</label>
      <div>
        <Icon icon="twitter" clickable></Icon>
        <Icon icon="linkedin" clickable></Icon>
      </div>
    </div>
    <div class="footer">
      <div class="mt-3" v-if="isSelf">
        <label class="mt-1">Notifications</label>
        <input type="checkbox" /> Email
        <input type="checkbox" /> Text
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../components/Icon.vue'
import api from '@/api'

export default {
  name: 'Person',
  components: { Icon },
  props: {
    slug: { required: true, type: String },
  },
  data() {
    return {
      errors: [],
      profile: null,
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    storeProfile() {
      return this.$store.state.users.profile || null
    },
    isSelf() {
      return this.storeProfile.slug === this.slug
    },
  },
  methods: {
    async fetchData() {
      const response = await api.getProfile(this.slug)
      if (!response.message) {
        this.profile = response
      } else {
        this.errors.push(response.message)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  @include for-large-down {
    text-align: center;
    flex-direction: column;
  }
}

.profile-activity {
  margin-top: 2rem;
  @include for-large-up {
    padding-left: 2rem;
  }
}

.profile-image {
  img {
    @extend .border-thin;
    @include shadow-color($dark);
    height: 100px;

    @include for-large-down {
      margin: 0 auto;
    }
  }
}
</style>
