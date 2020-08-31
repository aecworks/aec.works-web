<template>
  <div class="wrapper flex">
    <div class="content">
      <h1>{{ isEditing ? "Edit" : "New"}}</h1>

      <form class="form">
        <label>Name</label>
        <input type="text" class="input fill-x" v-model="company.name" />
        <label>Description</label>
        <textarea type="text" class="input fill-x" v-model="company.description" rows="3" />
        <label>Location</label>
        <input type="text" class="input fill-x" v-model="company.location" />
        <label>Website</label>
        <input type="text" class="input fill-x" v-model="company.website" />

        <div class="flex">
          <div class="fill-x">
            <label>Twitter handle</label>
            <input type="text" class="input fill-x" v-model="company.twitterHandle" />
          </div>
          <div class="fill-x ml-2">
            <label>Crunchbase id</label>
            <input type="text" class="input fill-x" v-model="company.crunchbaseId" />
          </div>
        </div>

        <label>Hashtags</label>
        <HashtagInput @changed="handleTagChange" />

        <label class="mt-1">Logo</label>
        <div class="flex flex-down">
          <div class="company-logo">
            <img :src="company.logoUrl" alt />
          </div>
          <div class="mt">
            <Button text="Upload" kind="text" @click="startCrop(imgFieldNames.logoUrl)" />
            <Button text="Paste" kind="text" @click="startPaste(imgFieldNames.logoUrl)" />
            <Button text="Remove" v-if="company.logoUrl" kind="text" @click="company.logoUrl=''" />
          </div>
        </div>

        <label class="mt-1">Cover</label>
        <div class="flex flex-down">
          <div class="company-cover">
            <img :src="company.coverUrl" alt />
          </div>
          <div class="mt">
            <Button text="Upload" kind="text" @click="startCrop(imgFieldNames.coverUrl)" />
            <Button text="Paste" kind="text" @click="startPaste(imgFieldNames.coverUrl)" />
            <Button text="Remove" v-if="company.coverUrl" kind="text" @click="company.coverUrl=''" />
          </div>
        </div>
        <Cropper
          v-if="croppingField"
          :imgUrl="company[croppingField]"
          :cropRatio="cropRatio"
          @done="handleCropDone"
        />

        <Modal v-if="pastingField" @clickOutside="endPaste">
          <div class="section flex flex-down flex-center">
            <IconLarge class="mt-1" icon="paste" />
            <p class="mt-1 muted small">
              <code>ctrl+c</code>
            </p>
          </div>
        </Modal>

        <div v-if="errors">
          <h3 class="mt-2">Errors:</h3>
          <ul>
            <li v-for="(value, key) in errors" :key="key">
              <span>
                <strong>{{key}}:</strong>
                {{value[0]}}
              </span>
            </li>
          </ul>
        </div>

        <Button :text="isEditing ? 'Create Revision' : 'Create'" class="mt-2" @click="handleSave" />
        <Button text="Cancel" @click="handleCancel" />
      </form>

      <hr class="mt-2" />

      <div class="mt-2">
        <h3>Preview</h3>
        <!-- zindex moves it above crop after insertion -->
        <CompanyCard :company="company" />
      </div>
    </div>
    <div class="sidebar">
      <h3 class="mb-2">Revisions</h3>
      <div class="revisions" v-for="rev in revisions" :key="rev.id">
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
import HashtagInput from '../components/forms/HashtagInput.vue'
import Button from '../components/forms/Button.vue'
import CompanyCard from '../components/CompanyCard.vue'
import Cropper from '../components/Cropper.vue'
import IconLarge from '../components/IconLarge.vue'
import Modal from '../components/Modal.vue'
import api from '@/api'
import { waitForLogin } from '@/mixins'
import { filePrompt, fileToBase64, subscribePaste, unsubscribePaste } from '@/utils'

export default {
  name: 'CompanyEdit',
  components: { Button, CompanyCard, Cropper, Modal, IconLarge, HashtagInput },
  props: {
    slug: {
      required: false,
      type: String,
    },
  },
  data() {
    return {
      imgFieldNames: {
        coverUrl: 'coverUrl',
        logoUrl: 'logoUrl',
      },
      cropRatio: 1,
      croppingField: false,
      pastingField: null,
      errors: null,
      revisions: [],
      company: {
        name: '',
        description: '',
        location: '',
        website: '',
        twitterHandle: '',
        crunchbaseId: '',
        logoUrl: '',
        coverUrl: '',
        hashtags: [],
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
      if (this.isEditing) {
        // Is Editing Company
        await api.postCompanyRevision(this.company.slug, this.company)
        this.revisions = await api.getCompanyRevisions(this.slug)
      } else {
        // Is Creating New
        const response = await api.postCompany(this.company)
        if (!response.errors) {
          const company = response
          this.$router.push({ name: 'Company', params: { slug: company.slug } })
        } else {
          this.errors = response.errors
        }
      }
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

    startPaste(fieldName) {
      this.pastingField = fieldName
      subscribePaste(this.handlePasted)
    },

    endPaste() {
      this.pastingField = null
      unsubscribePaste()
    },

    async handlePasted(file) {
      const dataUri = await fileToBase64(file)
      this.company[this.pastingField] = dataUri
      this.croppingField = this.pastingField
      this.endPaste()
    },

    async startCrop(fieldName) {
      const file = await filePrompt()
      const dataUri = await fileToBase64(file)
      this.company[fieldName] = dataUri
      this.cropRatio = fieldName == this.imgFieldNames.logoUrl ? 1 : 0.5
      this.croppingField = fieldName
    },

    async handleCropDone(file) {
      const image = await api.putImage(file, file, file.type)
      this.company[this.croppingField] = image.url
      this.croppingField = null
    },

    async handleRevisionApprove(revisionId) {
      const revision = await api.postCompanyRevisionApprove(revisionId)
      this.revisions = [...this.revisions.filter(({ id }) => id !== revisionId), revision]
      this.company = await api.getCompany(this.slug)
    },

    handleTagChange(hashtags) {
      this.company.hashtags = hashtags
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
  min-width: 60px;
  min-height: 60px;
  width: 60px;
  height: 60px;
  @extend .border-thick;
  background-color: white;
}

.company-cover img {
  min-height: 60px;
  height: 60px;
  min-width: 120px;
  width: 120px;
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
