<template>
  <div class="wrapper sm-grid-sidebar-down">
    <div class="content" v-if="company">
      <div class="company-images">
        <img class="logo" :src="company.logoUrl || defaultLogo" alt="Company Logo" />
        <img class="cover" :src="company.coverUrl || defaultCover" alt="Company Cover Image" />
      </div>

      <h1 class="mt-2">
        {{ company.name }}
        <span class="small muted ml">{{company.location || "Somewhere" }}</span>
      </h1>
      <!-- </div> -->

      <div class="mt-2 mb-2">
        <p class="sans">{{ company.description || "..." }}</p>

        <label class="mt-2">Website</label>
        <a :href="company.website">{{company.website || "-" | cleanUrl}}</a>

        <div class="mt-2 mb-2">
          <label>Tags</label>
          <Hashtag v-for="slug in company.hashtags" :slug="slug" :key="slug" />
        </div>

        <label class="mt-2">Social Media</label>
        <div class="mt">
          <a
            v-if="company.twitterHandle"
            :href="`https://www.twitter.com/${company.twitterHandle}`"
          >
            <!-- <img src="@/assets/images/twitter.svg" /> -->
            <Icon icon="twitter" clickable></Icon>
          </a>
          <a
            v-if="company.crunchbaseId"
            :href="`https://www.crunchbase.com/organization/${company.crunchbaseId}`"
          >
            <!-- <img src="@/assets/images/money.svg" /> -->
            <Icon icon="crunchbase" clickable></Icon>
          </a>
        </div>
      </div>
    </div>

    <div class="sidebar" v-if="company">
      <div>
        <Icon
          icon="clap"
          @click="handleClap(company)"
          clickable
        >{{localClapCount || company.clapCount}}</Icon>
      </div>
      <div>
        <Icon icon="chat">{{company.threadSize || 0}}</Icon>
      </div>

      <label class="mt-2">Share</label>
      <div class="mt">
        <IconShareTwitter />
        <!-- <Icon icon="linkedin" clickable></Icon> -->
      </div>
      <label class="mt-2">Contribute</label>
      <Icon class="mt" icon="pencil" @click="handleEdit" clickable>Edit</Icon>
    </div>

    <div class="footer">
      <Discussion v-if="company && company.threadId" :threadId="company.threadId" />
    </div>
  </div>
</template>

<script>
import Icon from '../components/Icon.vue'
import IconShareTwitter from '../components/IconShareTwitter.vue'
import api from '@/api'
import Discussion from '@/components/Discussion'
import Hashtag from '@/components/Hashtag'
import { waitForLogin } from '@/mixins'

export default {
  name: 'Company',
  components: {
    Discussion,
    Hashtag,
    Icon,
    IconShareTwitter,
  },
  props: {
    slug: { required: false, type: String },
  },
  data() {
    return {
      errors: [],
      company: null,
      localClapCount: null,
      defaultLogo: require('@/assets/images/image.svg'),
      defaultCover: 'https://picsum.photos/600/200.jpg?blur=5&grayscale',
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const company = await api.getCompany(this.slug)
      this.company = company
    },
    handleEdit() {
      this.$router.push({ name: 'CompanyEdit', params: { slug: this.slug } })
    },
    async handleClap(company) {
      await waitForLogin()
      const clapCount = await api.postCompanyClap(company.slug)
      this.localClapCount = clapCount
    },
  },
  filters: {
    cleanUrl(value) {
      return value.replace('https://', '').replace('http://', '')
    },
  },
}
</script>

<style lang="scss">
.sidebar {
  @include for-large-up {
    // margin-top: 130px;
  }
}
.company-images {
  position: relative;
  .logo {
    position: absolute;
    width: 100px;
    height: 100px;
    top: 25px;
    right: 25px;
    @extend .border-thin;
  }
  .cover {
    display: block; // Remove gap below image
    height: 100px;
    width: 100%;
    object-fit: cover;
    object-position: center;

    @extend .border-thin;
  }
}
</style>
