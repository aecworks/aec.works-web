<template>
  <div class="wrapper sm-grid-sidebar-down">
    <div v-if="company" class="content-header">
      <div class="company-images">
        <lazy-img
          class="cover"
          :src="company.currentRevision.coverUrl || defaultCover"
          alt="Company Cover Image"
        />
        <lazy-img
          class="logo"
          :src="company.currentRevision.logoUrl || defaultLogo"
          alt="Company Logo"
        />
      </div>
    </div>
    <div v-if="company" class="content">
      <h1 class="mt-2">
        {{ company.currentRevision.name }}
        <span class="small muted ml">{{ company.currentRevision.location || 'Somewhere' }}</span>
      </h1>

      <div class="mt-2 mb-2">
        <p class="sans">{{ company.currentRevision.description || '...' }}</p>
      </div>

      <div class="flex mt-2 mb-2">
        <div>
          <label>Website</label>
          <a :href="company.currentRevision.website">
            {{ company.currentRevision.website || '-' | cleanUrl }}
          </a>
        </div>
      </div>

      <div class="mt-2">
        <label>Tags</label>
        <Hashtag
          v-for="hashtagSlug in company.currentRevision.hashtags"
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
        <TwitterFeed
          v-if="company.currentRevision.twitter"
          :handle="company.currentRevision.twitter"
        />
      </div>
    </div>

    <div v-if="company" class="sidebar">
      <div class="mt-2">
        <Icon
          :icon="company.userDidClap ? 'clap' : 'clap_off'"
          icon-hover="clap"
          clickable
          @click="handleClap(company)"
        >
          {{ company.clapCount }}
        </Icon>
      </div>

      <div class="mt-2">
        <Button class="mr-0 block" @click="handleEdit">
          {{ userIsEditor ? 'Edit' : 'Suggest Edit' }}
        </Button>
      </div>

      <div v-if="userIsEditor" class="mt-2">
        <h4 class="mt-1 mb-1">Moderation</h4>
        <div class="mb-1">
          <div class="pill">{{ company.status }}</div>
        </div>
        <Button
          class="mr-2"
          :disabled="company.status == ModerationStatus.APPROVED"
          @click="handleModerate(ModerationStatus.APPROVED)"
        >
          Approve
        </Button>
        <Button
          class="mr-0"
          :disabled="company.status == ModerationStatus.REJECTED"
          @click="handleModerate(ModerationStatus.REJECTED)"
        >
          Reject
        </Button>
      </div>

      <div v-if="false" class="mt-2">
        <label></label>
        <SocialShare />
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
import { ModerationStatus } from '@/models.ts'

export default {
  name: 'Company',
  metaInfo() {
    const company = this.company
    return {
      title: () =>
        company && company.currentRevision.name ? company.currentRevision.name : 'Company',
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
      defaultLogo: require('@/assets/images/image.svg'),
      defaultCover: 'https://picsum.photos/600/200.jpg?blur=1&grayscale',
      ModerationStatus: ModerationStatus,
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
    async handleModerate(status) {
      await api.postCompanyModerationAction(this.slug, { status }, {
        headers: { 'Cache-Control': 'no-cache' },
      })
      this.fetchData()
    },
    handleEdit() {
      this.$router.push({ name: 'CompanyEdit', params: { slug: this.slug } })
    },
    async handleClap(company) {
      // Refactor, duplicated in Company Card
      await waitForLogin()
      const clapCount = await api.postCompanyClap(company.slug)
      company.clapCount = clapCount
      company.userDidClap = true
      clapForCount(clapCount)
    },
    handleHashtagClick(hashtagSlug) {
      this.$router.push({ name: 'CompanyList', query: { hashtags: hashtagSlug } })
    },
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  @include for-large-up {
    text-align: right;
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

    background-color: white;
    @extend .border-soft;
  }
  .cover {
    display: block; // Remove gap below image
    height: 200px; // match $content-header-height;
    width: 100%;
    object-fit: cover;
    object-position: center;
    @extend .border-thin;
    border-color: $dark-gray;
  }
}
</style>
