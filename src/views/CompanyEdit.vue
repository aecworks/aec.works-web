<template>
  <div class="content flex">
    <div class="page">
      <h1 class="page-title mb-1">{{ isEditing ? "Edit" : "New"}}</h1>

      <form class="form">
        <label>Name</label>
        <input type="text" class="fill-x" v-model="company.name" />
        <label>Description</label>
        <input type="text" class="fill-x" v-model="company.description" />
        <label>Location</label>
        <input type="text" class="fill-x" v-model="company.location" />
        <label>Website</label>
        <input type="text" class="fill-x" v-model="company.website" />
        <div class="flex">
          <div class="fill-x">
            <label>Twitter handle</label>
            <input type="text" class="fill-x" v-model="company.twitterHandle" />
          </div>
          <div class="fill-x">
            <label>Crunchbase id</label>
            <input type="text" class="fill-x" v-model="company.crunchbaseId" />
          </div>
        </div>
        <label>Hashtags</label>
        <input type="text" class="fill-x" @input="handleHashtagEdit" :value="company.hashtags" />
        <label>Logo</label>
        <input type="text" class="fill-x" v-model="company.logoUrl" />
        <input id="image-file" type="file" @change="handleLogoUpload($event)" />
        <!-- <img :src="company.logoUrl" /> -->
        <label>Cover</label>
        <input type="text" class="fill-x" v-model="company.coverUrl" />
        <input id="image-file" type="file" @change="handleCoverUpload($event)" />
        <!-- <img :src="company.coverUrl" /> -->

        <Button text="Save" class="mr-1" @click="handleSave" />
        <Button text="Cancel" @click="handleCancel" />
      </form>
      <div class="mt-3">
        <h3>Preview</h3>
        <CompanyCard :company="company" />
      </div>
    </div>
    <div class="sidebar">
      <div class="revisions" v-for="rev in revisions" :key="rev.id">
        <Avatar :profile="rev.createdBy" />
        <span>{{rev.createdAt | calendar }}</span>
        <div>
          <a @click="handleRevisionApprove(rev.id)" href="#">Apply</a>
        </div>
        <div>
          <a @click="showRevision(rev.id)" href="#">Show</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompanyCard from '../components/CompanyCard.vue'
import Button from '../components/forms/Button.vue'
import Avatar from '../components/Avatar.vue'
import api from '@/api'
import { waitForLogin } from '@/mixins'

export default {
  name: 'Company',
  components: { Avatar, Button, CompanyCard },
  props: {
    slug: {
      required: false,
      type: String,
    },
  },
  data() {
    return {
      errors: [],
      revisions: [],
      company: {
        name: '',
        description: '',
        location: '',
        website: '',
        twitterHandle: '',
        crunchbaseId: '',
        hashtags: '',
        logoUrl: '',
        coverUrl: '',
        text: '',
      },
    }
  },
  async created() {
    if (this.isEditing) {
      this.company = await api.getCompany(this.slug)
      this.revisions = await api.getCompanyRevisions(this.slug)
    }
  },
  computed: {
    isEditing() {
      return Boolean(this.slug)
    },
  },
  methods: {
    async handleSave() {
      await waitForLogin()
      const payload = { ...this.company, ...this.uploads }
      delete payload.logo // Remove Logo Url
      delete payload.cover // Remove Logo Url

      await api.postCompanyRevision(this.company.slug, payload)
      this.revisions = await api.getCompanyRevisions(this.slug)
    },
    handleCancel() {
      if (this.isEditing) {
        this.$router.push({ name: 'Company', params: { slug: this.slug } })
      } else {
        this.$router.push({ name: 'CompanyList' })
      }
    },
    handleHashtagEdit(e) {
      this.company.hashtags = e.target.value.split(',')
    },
    async handleFileUploadEvent(event) {
      const file = event.target.files[0]
      return await api.putImage(file.name, file)
    },
    async handleLogoUpload(event) {
      const image = await this.handleFileUploadEvent(event)
      this.company.logoUrl = image.url
    },
    async handleCoverUpload(event) {
      const image = await this.handleFileUploadEvent(event)
      this.company.coverUrl = image.url
    },
    async handleRevisionApprove(revisionId) {
      const revision = await api.postCompanyRevisionApprove(revisionId)
      this.revisions = [...this.revisions.filter(({ id }) => id !== revisionId), revision]
      this.company = await api.getCompany(this.slug)
    },
    showRevision(revisionId) {
      this.company = this.revisions.find(({ id }) => id === revisionId)
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

.revisions {
  margin-top: 2rem;
  @include for-large-up {
    // text-align: right;
  }
}
</style>
