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

      <div class="mt-2 mb-2">
        <p class="sans">{{ company.description || "..." }}</p>
      </div>

      <div class="flex mt-2 mb-2">
        <div>
          <label>Website</label>
          <a :href="company.website">{{company.website || "-" | cleanUrl}}</a>
        </div>
      </div>

      <div class="mt-2">
        <label>Tags</label>
        <Hashtag v-for="slug in company.hashtags" :slug="slug" :key="slug" />
      </div>

      <div class="mt-2" v-if="company.articles.length">
        <label class="mb">Articles</label>
        <ArticleCard v-for="article in company.articles" :key="article.url" :article="article" />
      </div>

      <div class="mt-2">
        <TwitterFeed v-if="company.twitterHandle" :handle="company.twitterHandle" />
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

      <div class="mt-2">
        <label>Share</label>
        <SocialShare />
      </div>

      <div class="mt-2" v-if="userIsEditor">
        <!-- <label>Contribute</label> -->
        <Button @click="handleEdit">Edit</Button>
      </div>
    </div>

    <div class="footer">
      <Discussion v-if="company && company.threadId" :threadId="company.threadId" />
    </div>
  </div>
</template>

<script>
import Button from '../components/forms/Button.vue'
import { USERS } from '@/store/users'
import SocialShare from '@/components/SocialShare'
import Icon from '@/components/Icon.vue'
import ArticleCard from '../components/ArticleCard.vue'
import TwitterFeed from '../components/TwitterFeed.vue'
import api from '@/api'
import Discussion from '@/components/Discussion'
import Hashtag from '@/components/Hashtag'
import { waitForLogin } from '@/mixins'

export default {
  name: 'Company',
  metaInfo() {
    const company = this.company
    return {
      title: () => (company && company.name ? company.name : 'Companies'),
    }
  },
  components: {
    Discussion,
    Hashtag,
    Icon,
    SocialShare,
    TwitterFeed,
    ArticleCard,
    Button,
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
  computed: {
    userIsEditor() {
      return this.$store.getters[USERS.IS_EDITOR]
    },
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
