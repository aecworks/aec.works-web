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
        <div class="company-logo flex flex-center">
          <img :src="company.logoUrl" alt />
          <div class="ml-1">
            <Button text="Upload" kind="text" @click="handleLogoFileSet" />
            <Button text="Remove" kind="text" @click="company.logoUrl=''" />
          </div>
          <span class="small muted">PS: You can paste from clipboard</span>
        </div>
        <Cropper
          :imgUrl="company.logoUrl"
          v-if="company.logoUrl && croppingLogo"
          @done="handleCropDone"
        />

        <img :src="company.coverUrl" />

        <Button text="Create Revision" class="mt-2" @click="handleSave" />
        <Button text="Cancel" @click="handleCancel" />
      </form>
      <div class="mt-3">
        <h3>Preview</h3>
        <CompanyCard :company="company" />
      </div>
    </div>
    <div class="sidebar">
      <div class="revisions" v-for="rev in revisions" :key="rev.id">
        <h3 class="mb-2">Revisions</h3>
        <h5>{{rev.createdAt | calendar }}</h5>
        <span class="muted small">By {{rev.createdBy.name}}</span>
        <div>
          <Button text="Show" kind="text" @click="showRevision(rev.id)" />
          <Button text="Apply" kind="text" @click="handleRevisionApprove(rev.id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from '../components/Cropper.vue'
import Button from '../components/forms/Button.vue'
import CompanyCard from '../components/CompanyCard.vue'
import api from '@/api'
import { waitForLogin } from '@/mixins'
import { filePrompt, fileToBase64, subscribePaste, unsubscribePaste } from '@/utils'

export default {
  name: 'Company',
  components: { Button, CompanyCard, Cropper },
  props: {
    slug: {
      required: false,
      type: String,
    },
  },
  data() {
    return {
      croppingLogo: false,
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
    subscribePaste(this.handlePaste)
    if (this.isEditing) {
      this.company = await api.getCompany(this.slug)
      this.revisions = await api.getCompanyRevisions(this.slug)
    }
  },
  destroyed() {
    unsubscribePaste()
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

    async handlePaste(file) {
      const dataUri = await fileToBase64(file)
      this.company.logoUrl = dataUri
      this.croppingLogo = true
    },

    async handleLogoFileSet() {
      const file = await filePrompt()
      const dataUri = await fileToBase64(file)
      this.company.logoUrl = dataUri
      this.croppingLogo = true
    },

    async handleCropDone(file) {
      const image = await api.putImage(file, file, file.type)
      this.company.logoUrl = image.url
      this.croppingLogo = false
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
.company-logo img {
  width: 60px;
  height: 60px;
  @extend .border-thick;
  background-color: white;
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
