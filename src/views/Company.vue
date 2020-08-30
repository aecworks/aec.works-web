<template>
  <div class="wrapper sm-grid-sidebar-down">
    <div class="content" v-if="company">
      <div class="flex flex-center">
        <h1>
          {{ company.name }}
          <span class="small muted ml">{{company.location || "Somewhere" }}</span>
        </h1>
      </div>

      <div class="flex">
        <div>
          <div class="mt-2">
            <p class="sans">{{ company.description || "..." }}</p>

            <label class="mt-2">Website</label>
            <a :href="company.website">{{company.website || "-" | cleanUrl}}</a>

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
                <Icon icon="money" clickable></Icon>
              </a>
            </div>
          </div>

          <div class="mt-2">
            <Hashtag v-for="slug in company.hashtags" :slug="slug" :key="slug" />
          </div>
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
      <div>
        <Icon icon="twitter" clickable></Icon>
        <Icon icon="linkedin" clickable></Icon>
      </div>
      <label class="mt-2">Contribute</label>
      <Icon icon="pencil" @click="handleEdit" clickable>Edit</Icon>
    </div>

    <div class="footer">
      <Discussion v-if="company && company.threadId" :threadId="company.threadId" />
    </div>
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
    slug: { required: false, type: String },
  },
  data() {
    return {
      errors: [],
      company: null,
      localClapCount: null,
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
.company-icon {
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
    // text-align: right;
  }
}
</style>
