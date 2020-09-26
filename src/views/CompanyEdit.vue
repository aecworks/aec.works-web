<template>
  <div class="wrapper sm-grid-sidebar-down">
    <div v-if="company" class="content">
      <h1>{{ isEditing ? 'Edit' : 'New' }}</h1>

      <form class="form">
        <label for="input-name">Name</label>
        <input id="input-name" v-model="company.name" type="text" class="input fill-x" />
        <label for="input-description">Description</label>
        <textarea
          id="input-description"
          v-model="company.description"
          type="text"
          class="input fill-x"
          rows="3"
        />

        <label for="input-location">Location</label>
        <gmaps-autocomplete v-model="company.location" />

        <label for="input-website">Website</label>
        <input id="input-website" v-model="company.website" type="text" class="input fill-x" />

        <div class="flex">
          <div class="fill-x">
            <label for="input-twitter-handle">Twitter handle</label>
            <input
              id="input-twitter-handle"
              v-model="company.twitterHandle"
              type="text"
              class="input fill-x"
            />
          </div>
          <div class="fill-x ml-2">
            <label for="input-crunchbase-id">Crunchbase id</label>
            <input
              id="input-crunchbase-id"
              v-model="company.crunchbaseId"
              type="text"
              class="input fill-x"
            />
          </div>
        </div>

        <label for="input-hashtags">Hashtags</label>
        <HashtagInput
          v-if="isReadyForHashtags"
          :initial-tags="company.hashtags"
          @changed="handleTagChange"
        />

        <label class="mt-1">Logo</label>
        <div class="flex flex-down">
          <div class="company-logo" :class="{ empty: !company.logoUrl }">
            <img :src="company.logoUrl || defaultImageUrl" alt />
          </div>
          <div class="mt">
            <Button
              kind="text"
              aria-label="upload logo file"
              @click="handleFileUploaded(imgFieldNames.logoUrl)"
            >
              Upload
            </Button>
            <Button
              kind="text"
              aria-label="upload logo URL"
              @click="startPaste(imgFieldNames.logoUrl)"
            >
              Paste
            </Button>
            <Button
              v-if="company.logoUrl"
              kind="text"
              aria-label="remove current logo"
              @click="company.logoUrl = ''"
            >
              Remove
            </Button>
          </div>
        </div>

        <label class="mt-1">Cover</label>
        <div class="flex flex-down">
          <div class="company-cover" :class="{ empty: !company.coverUrl }">
            <img :src="company.coverUrl || defaultImageUrl" alt />
          </div>
          <div class="mt">
            <Button
              kind="text"
              aria-label="upload cover file"
              @click="handleFileUploaded(imgFieldNames.coverUrl)"
            >
              Upload
            </Button>
            <Button
              kind="text"
              aria-label="paste cover file URL"
              @click="startPaste(imgFieldNames.coverUrl)"
            >
              Paste
            </Button>
            <Button
              v-if="company.coverUrl"
              aria-label="remove existing cover file"
              kind="text"
              @click="company.coverUrl = ''"
            >
              Remove
            </Button>
          </div>
        </div>
        <Cropper
          v-if="croppingField"
          :img-url="company[croppingField]"
          :crop-ratio="cropRatio"
          @done="cropCompleted"
          @cancel="cropCanceled"
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
                <strong>{{ key }}:</strong>
                {{ value[0] }}
              </span>
            </li>
          </ul>
        </div>

        <Button class="mt-2" @click="handleSave">
          {{ isEditing ? 'Create Revision' : 'Create' }}
        </Button>
        <Button @click="handleCancelEdit">Cancel</Button>
      </form>

      <hr class="mt-2" />

      <div class="mt-2">
        <h3>Preview</h3>
        <CompanyCard :company="company" />
      </div>
    </div>
    <div class="sidebar mb-2">
      <h3 class="mb-2">Revisions</h3>
      <div v-for="rev in revisions" :key="rev.id" class="revisions">
        <label v-if="rev.id == company.lastRevisionId" class="mb">👇Applied 👇</label>
        <label v-if="rev.approvedBy && rev.id == company.id" class="mb">👇Previwing 👇</label>
        <h5>{{ rev.createdAt | calendar }}</h5>
        <span class="muted small">{{ rev.createdBy.name }}</span>
        <div>
          <Button kind="text" aria-label="show revision" @click="showRevision(rev)">Show</Button>
          <Button kind="text" aria-label="apply revision" @click="handleRevisionApprove(rev.id)">
            Apply
          </Button>
        </div>
      </div>
      <div class="mt-2">
        <h3>Created</h3>
        <h5 class="mt-1">{{ company.createdAt | calendar }}</h5>
        <span v-if="company.createdBy" class="small muted">{{ company.createdBy.name }}</span>
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
import GmapsAutocomplete from '../components/GmapsAutocomplete.vue'
import api from '@/api'
import { waitForLogin } from '@/mixins'
import { filePrompt, fileToBase64, subscribePaste, unsubscribePaste } from '@/utils'

export default {
  name: 'CompanyEdit',
  metaInfo() {
    const company = this.company
    const isEditing = this.isEditing
    return {
      title: () => {
        if (isEditing) {
          return company && company.name ? `Edit: ${company.name}` : 'Edit Company'
        }
        return 'Add Company'
      },
    }
  },
  components: { Button, CompanyCard, Cropper, GmapsAutocomplete, Modal, IconLarge, HashtagInput },
  props: {
    slug: {
      default: null,
      type: String,
    },
  },
  data() {
    return {
      defaultImageUrl: require('@/assets/images/image.svg'),
      imgFieldNames: {
        coverUrl: 'coverUrl',
        logoUrl: 'logoUrl',
      },
      cropRatio: 1,
      croppingField: false,
      pastingField: null,
      errors: null,
      revisions: [],
      isReadyForHashtags: false,
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
        lastRevisionId: '',
      },
    }
  },
  computed: {
    isEditing() {
      return Boolean(this.slug)
    },
  },
  async created() {
    if (this.isEditing) {
      this.company = await api.getCompany(this.slug)
      this.revisions = await api.getCompanyRevisions(this.slug)
    }
    /// Use this to hold back hashtag input otherwise it's initiated as blank
    // TODO: Sync, when applying doe snot work
    this.isReadyForHashtags = true
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

    handleCancelEdit() {
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
      subscribePaste(this.onPasteEvent)
    },

    endPaste() {
      this.pastingField = null
      unsubscribePaste()
    },

    async onPasteEvent(file) {
      const dataUri = await fileToBase64(file)
      this.company[this.pastingField] = dataUri
      this.startCrop(this.pastingField)
      this.endPaste()
    },

    async handleFileUploaded(fieldName) {
      const file = await filePrompt()
      const dataUri = await fileToBase64(file)
      this.company[fieldName] = dataUri
      this.startCrop(fieldName)
    },

    startCrop(fieldName) {
      this.cropRatio = fieldName == this.imgFieldNames.logoUrl ? 1 : 0.5
      this.croppingField = fieldName
    },

    cropCanceled() {
      this.company[this.croppingField] = null
      this.croppingField = null
    },

    async cropCompleted(file) {
      const image = await api.putImage(file, file, file.type)
      this.company[this.croppingField] = image.url
      this.croppingField = null
    },

    handleTagChange(hashtags) {
      this.company.hashtags = hashtags
    },

    async handleRevisionApprove(revisionId) {
      await api.postCompanyRevisionApprove(revisionId)
      this.revisions = await api.getCompanyRevisions(this.slug)
      this.company = await api.getCompany(this.slug)
      this.isReadyForHashtags = false
      this.$nextTick(() => {
        this.isReadyForHashtags = true
      })
    },

    showRevision(revision) {
      this.isReadyForHashtags = false
      this.$nextTick(() => {
        this.company = { ...this.company, ...revision }
        this.isReadyForHashtags = true
      })
    },
  },
}
</script>

<style lang="scss">
.company-logo {
  height: 60px;
  width: 60px;
  overflow: hidden;
  @extend .border-thin;

  img {
    display: block;
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
    background-color: white;
  }

  &.empty {
    width: 60px;
    img {
      height: 50%;
      object-fit: scale-down;
      margin-top: 15px;
    }
  }
}

.company-cover {
  @extend .company-logo;
  width: 120px;
}

@include for-large-down {
  flex-wrap: wrap;
}

.revisions {
  margin-top: 2rem;
  @include for-large-up {
  }
}
</style>
