<template>
  <div class="wrapper sm-grid-sidebar-down">
    <div v-if="company" class="content-header">
      <div class="company-images">
        <lazy-img class="cover" :src="company.coverUrl || defaultCover" alt="Company Cover Image" />
        <lazy-img class="logo" :src="company.logoUrl || defaultLogo" alt="Company Logo" />
      </div>
    </div>
    <div v-if="company" class="content">
      <h1 class="mt-2">
        {{ company.name }}
        <span class="small muted ml">{{ company.location || 'Somewhere' }}</span>
      </h1>

      <div class="mt-2 mb-2">
        <p class="sans">{{ company.description || '...' }}</p>
      </div>

      <div class="flex mt-2 mb-2">
        <div>
          <label>Website</label>
          <a :href="company.website">{{ company.website || '-' | cleanUrl }}</a>
        </div>
      </div>

      <div class="mt-2">
        <label>Tags</label>
        <Hashtag
          v-for="hashtagSlug in company.hashtags"
          :key="hashtagSlug"
          :slug="hashtagSlug"
          clickable
          @click="handleHashtagClick(hashtagSlug)"
        />
      </div>

      <div v-if="company.articles.length" class="mt-2">
        <label class="mb">Articles</label>
        <ArticleCard v-for="article in company.articles" :key="article.url" :article="article" />
      </div>

      <div class="mt-2">
        <TwitterFeed v-if="company.twitter" :handle="company.twitter" />
      </div>
    </div>

    <div v-if="company" class="sidebar">
      <!-- <label>Claps</label> -->
      <div class="mt-2">
        <Icon icon="clap" clickable @click="handleClap(company)">
          {{ localClapCount || company.clapCount }}
        </Icon>
      </div>

      <div v-if="false" class="mt-2">
        <label></label>
        <SocialShare />
      </div>

      <div v-if="userIsEditor" class="mt-2">
        <!-- <label>Contribute</label> -->
        <Button @click="handleEdit">Edit</Button>
      </div>
    </div>

    <div v-if="company && company.threadId" class="footer">
      <Discussion :thread-id="company.threadId" />
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
import LazyImg from '@/components/LazyImg'
import { waitForLogin } from '@/mixins'
import { clapForCount } from '@/libs/sounds'

export default {
  name: 'Company',
  metaInfo() {
    const company = this.company
    return {
      title: () => (company && company.name ? company.name : company.slug || 'Company'),
    }
  },
  components: {
    Discussion,
    LazyImg,
    Hashtag,
    Icon,
    SocialShare,
    TwitterFeed,
    ArticleCard,
    Button,
  },
  filters: {
    cleanUrl(value) {
      return value.replace('https://', '').replace('http://', '')
    },
  },
  props: {
    slug: { required: true, type: String },
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
      clapForCount(clapCount)
    },
    handleHashtagClick(hashtagSlug) {
      this.$router.push({ name: 'CompanyList', query: { hashtags: hashtagSlug } })
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
    width: 80px;
    height: 80px;
    bottom: -25px;
    left: 10px;
    @extend .border-thin;
    @include shadow-color($dark);
  }
  .cover {
    display: block; // Remove gap below image
    height: 200px; // match $content-header-height;
    width: 100%;
    object-fit: cover;
    object-position: center;
    @extend .border-thin;
  }
}
</style>
