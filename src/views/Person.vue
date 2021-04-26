<template>
  <div v-if="profile" class="wrapper">
    <div class="content">
      <div class="profile">
        <div class="profile-data">
          <div class="profile-image">
            <LazyImg :src="profile.avatarUrl" />
          </div>
          <h2 class="mt-1">{{ profile.name }}</h2>
          <div class="mt">
            <a v-if="profile.github" :href="`https://github.com/${profile.github}`">
              <Icon icon="github"></Icon>
            </a>
            <a v-if="profile.twitter" :href="`https://twitter.com/${profile.twitter}`">
              <Icon icon="twitter"></Icon>
            </a>
          </div>

          <label class="mt-2">Location</label>
          <p class="sans">{{ profile.location }}</p>

          <label class="mt-1">About</label>
          <p class="sans">{{ profile.bio }}</p>
        </div>
        <div class="profile-activity">
          <div>
            <h3 class="mt-0 mb-1">Clapped For</h3>
            <ul class="mt-1">
              <li v-if="!companyClaps.length">None so far</li>
              <li v-for="company in companyClaps" :key="company.slug" class="mb">
                <router-link tag="a" :to="{ name: 'Company', params: { slug: company.slug } }">
                  {{ company.name }}
                </router-link>
              </li>
            </ul>
          </div>
          <div>
            <TwitterFeed v-if="profile.twitter" class="mt-2" :handle="profile.twitter" />
          </div>
        </div>
      </div>
    </div>
    <div class="sidebar hidden-sm">
      <!-- <div class="mt-2">
        <label>Share</label>
        <SocialShare />
      </div> -->
    </div>
    <div class="footer">
      <div v-if="false" class="mt-3">
        <label class="mt-1">Notifications</label>
        <input type="checkbox" />
        Email
        <input type="checkbox" />
        Text
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../components/Icon.vue'
import TwitterFeed from '../components/TwitterFeed.vue'
import LazyImg from '../components/LazyImg.vue'
import api from '@/api'
// import Icon from '../components/Icon.vue'
// import SocialShare from '../components/SocialShare.vue'

export default {
  name: 'Person',
  metaInfo() {
    const profile = this.profile
    return {
      title: () => (profile && profile.name ? profile.name : 'People'),
    }
  },
  components: { LazyImg, TwitterFeed, Icon },
  props: {
    slug: { required: true, type: String },
  },
  data() {
    return {
      errors: [],
      profile: null,
      companyClaps: [],
    }
  },
  computed: {
    storeProfile() {
      return this.$store.state.users.profile || null
    },
    isSelf() {
      return this.storeProfile && this.storeProfile.slug === this.slug
    },
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const [profileResponse, clapsResponse] = await Promise.all([
        api.getProfile(this.slug),
        api.getCompanyClapsByProfileSlug(this.slug),
      ])
      if (!profileResponse.message && !clapsResponse.message) {
        this.profile = profileResponse
        this.companyClaps = clapsResponse
      } else {
        this.errors.push(...profileResponse.message, ...clapsResponse.message)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  @include for-large-down {
    flex-wrap: wrap;
    text-align: center;
    justify-content: center;
    align-content: center;
  }
}
.profile-data {
  width: 200px;
  flex-shrink: 0;
}
.profile-activity {
  @include for-large-down {
    margin-top: 2rem;
  }
}

.profile-image {
  @extend .border-soft;
  // position: absolute;
  // border-radius: 50px;;
  display: inline-block;
  text-align: center;
  overflow: hidden;
  img {
    display: block;
    height: 100px;
    width: 100px;
  }
}
</style>
