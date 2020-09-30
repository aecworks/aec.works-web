<template>
  <div v-if="profile" class="wrapper">
    <div class="content">
      <div class="profile">
        <div class="profile-data">
          <div class="profile-image">
            <LazyImg
              :src="
                profile.avatarUrl || 'https://avatars.dicebear.com/api/male/john.svg?mood[]=happy'
              "
            />
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
          <h2 class="mt-2">Posts</h2>
          TODO
          <h2>Tweets</h2>
          <TwitterFeed v-if="profile.twitter" :handle="profile.twitter" />
        </div>
      </div>
    </div>
    <div class="sidebar hidden-sm">
      <div class="mt-2">
        <label>Share</label>
        <SocialShare />
      </div>
    </div>
    <div class="footer">
      <div v-if="isSelf" class="mt-3">
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
import SocialShare from '../components/SocialShare.vue'
import TwitterFeed from '../components/TwitterFeed.vue'
import LazyImg from '../components/LazyImg.vue'
import Icon from '../components/Icon.vue'
import api from '@/api'

export default {
  name: 'Person',
  metaInfo() {
    const profile = this.profile
    return {
      title: () => (profile && profile.name ? profile.name : 'People'),
    }
  },
  components: { Icon, LazyImg, TwitterFeed, SocialShare },
  props: {
    slug: { required: true, type: String },
  },
  data() {
    return {
      errors: [],
      profile: null,
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
    flex-wrap: wrap;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
}
.profile-data {
  width: 200px;
}
.profile-activity {
  @include for-large-down {
    margin-top: 2rem;
  }
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
