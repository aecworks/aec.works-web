<template>
  <div class="content flex flex-down">
    <div class="flex">
      <div class="page" v-if="company">
        <h1 class="page-title">{{ company.name }}</h1>

        <div class="mt">
          <p class="sans">{{ company.description || "..." }}</p>
        </div>
        <div>
          <!-- <img :src="company.cover || defaultLogo" /> -->
        </div>

        <div class="mt-2">
          <Hashtag v-for="slug in company.hashtags" :slug="slug" :key="slug" />
        </div>

        <Discussion v-if="company && company.thread" :threadId="company.thread" />
      </div>

      <div class="sidebar" v-if="company">
        <div class="company-facts">
          <div class="company-info-item">
            <label>Website</label>
            <span>
              <a :href="company.website">{{company.website || "-" | cleanUrl}}</a>
            </span>
          </div>

          <div class="company-info-item">
            <label>Location</label>
            <span>{{company.location || "Somewhere" }}</span>
          </div>

          <div class="company-info-item">
            <label>Social</label>
            <span>
              <a
                v-if="company.twitterHandle"
                :href="`https://www.twitter.com/${company.twitterHandle}`"
              >
                <img src="@/assets/images/twitter.svg" />
              </a>
              <a
                v-if="company.crunchbaseId"
                :href="`https://www.crunchbase.com/organization/${company.crunchbaseId}`"
              >
                <img src="@/assets/images/money.svg" />
              </a>
            </span>
          </div>

          <label>Contribute</label>
          <Icon icon="pencil" @click="handleEdit" clickable>Edit</Icon>
        </div>
      </div>
    </div>
    <!-- <Discussion v-if="company && company.thread" :threadId="company.thread" /> -->
  </div>
</template>

<script>
import Icon from '../components/Icon.vue'
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
  },
  props: {
    slug: { required: true, type: String },
  },
  data() {
    return {
      errors: [],
      company: null,
      defaultLogo: 'https://api.adorable.io/avatars/285/abott@adorable.png',
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
  },
  filters: {
    cleanUrl(value) {
      return value.replace('https://', '').replace('http://', '')
    },
  },
}
</script>

<style lang="scss">
.company-icon {
  text-align: right;
  img {
    height: 64px;
  }
}

@include for-large-down {
  flex-wrap: wrap;
}

.company-facts {
  .company-info-item {
    margin-bottom: 1rem;
    label {
      @extend .small;
    }
    span {
      @extend .small;
    }
  }
  margin-top: 1rem;
  @include for-large-up {
    text-align: right;
  }
}
</style>
