<template>
  <div class="wrapper">
    <div class="content">
      <div v-if="profile">
        <div class="page-header">
          <h1 class="page-title">{{ profile.name }}</h1>
        </div>

        <div class="profile-content flex">
          <div class="profile-bio">
            <div>
              <img class="profile-image" :src="profile.avatarUrl" />
            </div>

            <label class="mt-2">Bio</label>
            <p>{{ profile.bio }}</p>

            <label class="mt-2">Location</label>
            <p>{{ profile.location }}</p>

            <!-- TODO Make Social Media Component -->
            <label class="mt-2">Social</label>
            <div class="mt">
              <Icon icon="twitter" clickable></Icon>
              <Icon icon="linkedin" clickable></Icon>
            </div>
          </div>
        </div>

        <!-- <span class="muted">[ profile settings will come here ]</span> -->
        <!-- <label>Twitter</label> -->
        <div class="profile-controls" v-if="isSelf">
          <hr />
          <label class="mt-1">Notifications</label>
          <input type="checkbox" /> Email
          <input type="checkbox" /> Text
        </div>
      </div>
    </div>
    <div class="sidebar hidden-sm">
      <label class="mt-2">Share</label>
      <div>
        <Icon icon="twitter" clickable></Icon>
        <Icon icon="linkedin" clickable></Icon>
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

<style lang="scss">
#twitter-widget-0 {
  width: 100% !important;
  // text-align: right;
}
.profile-content {
  margin-bottom: 2rem;
  flex: 0;

  @include for-large-down {
    flex-wrap: wrap;
  }

  .profile-bio {
    @include for-large-up {
      padding-right: 2rem;
    }
  }
  .profile-facts {
    @include for-large-up {
      flex-shrink: 0;
      margin-left: auto;
      text-align: right;
    }
  }
  .profile-image {
    height: 100px;
    @extend .border-thin;
  }
}
</style>
