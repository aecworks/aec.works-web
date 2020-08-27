<template>
  <div class="content">
    <div class="page">
      <div v-if="profile">
        <div class="page-header">
          <h2 class="page-title">{{ profile.name }}</h2>
        </div>

        <div class="profile-content flex">
          <div class="profile-bio">
            <p>{{ profile.bio }}</p>
          </div>

          <div class="profile-facts">
            <!-- {{profile.avatarUrl}} -->
            <img class="profile-image" :src="profile.avatarUrl" />
            <label>Location</label>
            <p class="small muted">{{ profile.location }}</p>
            <label>Twitter</label>
            <p>{{ profile.twitter }}</p>
          </div>
        </div>

        <a
          class="twitter-timeline"
          data-height="400"
          data-dnt="true"
          data-theme="light"
          :href="`https://twitter.com/${profile.twitter}`"
        >Tweets by {{profile.twitter}}</a>
        <!-- data-width="400" -->
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'Person',
  components: {},
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
  }
}
</style>
