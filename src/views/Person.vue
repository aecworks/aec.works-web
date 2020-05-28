<template>
  <div class="page">
    <div v-if="person">
      <div class="page-header">
        <h2 class="page-title">{{ person.name }}</h2>
      </div>

      <div class="profile-content flex">
        <div class="profile-bio">
          <p>{{ person.bio }}</p>
        </div>
        <div class="profile-facts">
          <label>Location</label>
          <p class="small muted">{{ person.location }}</p>
          <label>Twitter</label>
          <p>{{ person.twitter }}</p>
        </div>
      </div>

      <a
        class="twitter-timeline"
        data-height="400"
        data-dnt="true"
        data-theme="light"
        :href="`https://twitter.com/${person.twitter}`"
      >Tweets by {{person.twitter}}</a>
      <!-- data-width="400" -->
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
      person: null,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const response = await api.getProfile(this.slug)
      if (!response.message) {
        this.person = response
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
}
</style>
