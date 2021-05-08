<template>
  <div class="wrapper sm-grid-sidebar-down">
    <LoaderOverlay v-if="isLoadingBlocked"></LoaderOverlay>
    <div class="content">
      <h1 class="mt-0">
        {{ isEditing ? 'Edit' : 'New' }}
      </h1>

      <form class="form">
        <label for="input-name">Name</label>
        <input id="input-name" v-model="revisionState.name" type="text" class="input fill-x" />
        <label for="input-description">Description</label>
        <textarea
          id="input-description"
          v-model="revisionState.description"
          type="text"
          class="input fill-x"
          rows="3"
        />

        <label for="input-location">Location</label>
        <gmaps-autocomplete v-model="revisionState.location" />

        <label for="input-website">Website</label>
        <input
          id="input-website"
          v-model="revisionState.website"
          type="text"
          class="input fill-x"
          @blur="formatWebsite"
        />

        <div class="flex">
          <div class="fill-x">
            <label for="input-twitter-handle">Twitter Handle</label>
            <div class="input-group">
              <span class="input-group-prefix">@</span>
              <input
                id="input-twitter-handle"
                v-model="revisionState.twitter"
                class="input input-with-prefix fill-x"
                type="text"
              />
            </div>
          </div>
          <div class="fill-x ml-2">
            <label for="input-crunchbase-id">Crunchbase id</label>
            <input
              id="input-crunchbase-id"
              v-model="revisionState.crunchbaseId"
              type="text"
              class="input fill-x"
            />
          </div>
        </div>

        <label for="input-hashtags">Hashtags</label>
        <HashtagInput
          v-if="isReadyForHashtags"
          :initial-tags="revisionState.hashtags"
          @changed="handleTagChange"
        />

        <label class="mt-1">Logo</label>
        <div class="company-logo" :class="{ empty: !revisionState.logoUrl }" @click="clearLogo">
          <img :src="revisionState.logoUrl || defaultImageUrl" alt />
        </div>
        <ImageUploader
          :crop-ratio="1"
          @uploaded="handleLogoUploaded"
          @error="handleImageUploadError"
        />

        <label class="mt-1">Cover</label>
        <div class="company-cover" :class="{ empty: !revisionState.coverUrl }" @click="clearCover">
          <img :src="revisionState.coverUrl || defaultImageUrl" alt />
        </div>
        <ImageUploader
          :crop-ratio="0.5"
          @uploaded="handleCoverUploaded"
          @error="handleImageUploadError"
        />

        <div v-if="errors">
          <h3 class="mt-2">Errors</h3>
          <ul>
            <li v-for="(value, key) in errors" :key="key" class="mt">
              <span class="pill">
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
      <div v-if="company.status">
        <span class="pill">{{ company.status }}</span>
      </div>

      <div v-if="revisions.length" class="mt-2">
        <h3 class="mb-1">Revisions</h3>

        <div v-for="rev in revisions" :key="rev.id" class="revision">
          <h5>{{ rev.createdAt | calendar }}</h5>
          <h5 class="muted small">{{ rev.createdBy.name }}</h5>
          <h5 class="muted small">{{ rev.status | capitalize }}</h5>

          <div class="mt">
            <Icon
              :icon="rev.id == revisionState.id ? 'eye' : 'eye_off'"
              icon-hover="eye"
              :clickable="rev.id != revisionState.id"
              title="preview"
              @click="rev.id != revisionState.id ? showRevision(rev) : 1"
            ></Icon>
            <Icon
              v-if="userIsEditor"
              :icon="rev.id == company.currentRevision.id ? 'apply' : 'apply_off'"
              :icon-hover="rev.id == revisionState.id ? 'apply' : 'apply_off'"
              :clickable="rev.id != company.currentRevision.id && rev.id == revisionState.id"
              title="apply"
              @click="
                rev.id != company.currentRevision.id && rev.id == revisionState.id
                  ? handleRevisionApprove(rev.id)
                  : 1
              "
            ></Icon>
          </div>
        </div>
      </div>
      <div v-if="company.createdAt" class="mt-2">
        <h3>Created</h3>
        <div class="revision">
          <h5 class="mt-1">{{ company.createdAt | calendar }}</h5>
          <span v-if="company.createdBy" class="small muted">{{ company.createdBy.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../components/Icon.vue'
import LoaderOverlay from '../components/LoaderOverlay.vue'
import HashtagInput from '../components/forms/HashtagInput'
import Button from '../components/forms/Button'
import CompanyCard from '../components/CompanyCard'
import ImageUploader from '../components/ImageUploader.vue'
import GmapsAutocomplete from '../components/GmapsAutocomplete'
import api from '@/api'
import { waitForLogin } from '@/mixins'
import { USERS } from '@/store/users'

export default {
  name: 'CompanyEdit',
  metaInfo() {
    const company = this.company
    const isEditing = this.isEditing
    return {
      title: () => {
        if (isEditing) {
          return company && this.revisionState.name
            ? `Edit: ${this.revisionState.name}`
            : 'Edit Company'
        }
        return 'Add Company'
      },
    }
  },
  components: {
    Button,
    CompanyCard,
    GmapsAutocomplete,
    HashtagInput,
    ImageUploader,
    LoaderOverlay,
    Icon,
  },
  props: {
    slug: {
      default: null,
      type: String,
    },
  },
  data() {
    return {
      isLoadingBlocked: false,
      defaultImageUrl: require('@/assets/images/image.svg'),
      errors: null,
      revisions: [],
      isReadyForHashtags: false,
      revisionState: {
        name: '',
        description: '',
        location: '',
        website: '',
        twitter: '',
        crunchbaseId: '',
        logoUrl: '',
        logo: '',
        coverUrl: '',
        cover: '',
        hashtags: [],
        createdBy: '',
      },
      company: {
        status: '',
        createdBy: '',
        currentRevision: {
          id: '',
        },
      },
    }
  },
  computed: {
    isEditing() {
      return Boolean(this.slug)
    },
    userIsEditor() {
      return this.$store.getters[USERS.IS_EDITOR]
    },
  },
  async created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.isReadyForHashtags = false
      if (this.isEditing) {
        this.company = await api.getCompany(this.slug, { fresh: true })
        this.revisionState = this.company.currentRevision
        this.revisions = await api.getCompanyRevisions(this.slug, { fresh: true })
      }
      /// Use this to hold back hashtag input otherwise it's initiated as blank
      // TODO: Sync, when applying doe snot work
      this.isReadyForHashtags = true
    },
    async handleSave() {
      await waitForLogin()
      this.isLoadingBlocked = true
      try {
        if (this.isEditing) {
          // Is Editing Company
          const response = await api.postCompanyRevision(this.company.slug, this.revisionState)
          if (response.errors) {
            this.errors = response.errors
          }
          this.fetchData()
        } else {
          // Is Creating New
          const response = await api.postCompany(this.revisionState)
          if (!response.errors) {
            const company = response
            this.$router.push({ name: 'Company', params: { slug: company.slug } })
          } else {
            this.errors = response.errors
          }
        }
      } catch (e) {
        console.error(e)
      }
      this.isLoadingBlocked = false
    },

    handleCancelEdit() {
      if (this.isEditing) {
        this.$router.push({ name: 'Company', params: { slug: this.slug } })
      } else {
        this.$router.push({ name: 'CompanyList' })
      }
    },

    clearLogo() {
      this.revisionState.logoUrl = ''
      this.revisionState.logo = ''
    },

    clearCover() {
      this.revisionState.coverUrl = ''
      this.revisionState.cover = ''
    },

    handleLogoUploaded(image) {
      this.revisionState.logoUrl = image.url
      this.revisionState.logo = image.id
    },

    handleCoverUploaded(image) {
      this.revisionState.coverUrl = image.url
      this.revisionState.cover = image.id
    },

    handleImageUploadError(errorMsg) {
      this.errors = { 'Image Upload': [errorMsg] }
    },

    handleHashtagEdit(e) {
      this.revisionState.hashtags = e.target.value.split(',')
    },

    handleTagChange(hashtags) {
      this.revisionState.hashtags = hashtags
    },

    async handleRevisionApprove(revisionId) {
      this.isLoadingBlocked = true
      try {
        await api.postCompanyRevisionApprove(revisionId)
        this.fetchData()
      } catch (e) {
        console.error(e)
      }
      this.isLoadingBlocked = false
    },

    showRevision(revision) {
      this.isReadyForHashtags = false
      this.$nextTick(() => {
        this.revisionState = revision
        this.isReadyForHashtags = true
      })
    },

    formatWebsite(event) {
      const withHttp = (url) => (!/^https?:\/\//i.test(url) ? `https://${url}` : url)
      this.revisionState.website = withHttp(event.target.value)
    },
  },
}
</script>

<style lang="scss">
.company-logo {
  height: 60px;
  width: 60px;
  overflow: hidden;
  position: relative;
  @extend .border-thin;

  &:not(.empty):hover {
    cursor: pointer;
    img {
      opacity: 1;
    }
  }
  &:not(.empty):hover::after,
  &:not(.empty):hover::before {
    content: '';
    position: absolute;
    top: 27px;
    height: 4px;
    width: 30px;
    background-color: $dark;
    transform: translateX(50%) rotate(45deg);
  }
  &:not(.empty):hover::before {
    transform: translateX(50%) rotate(-45deg);
  }

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

  &:not(.empty):hover::before,
  &:not(.empty):hover::after {
    margin-left: 30px;
  }
}

@include for-large-down {
  flex-wrap: wrap;
}

.revision {
  margin-left: 5px;
  padding-left: 20px;
  position: relative;
  margin-bottom: 20px;

  &:not(:last-child)::before {
    content: '';
    position: absolute;
    left: 0;
    top: 20px;
    height: 100%;
    border-left: 1px solid $dark;
  }
  &::after {
    content: '';
    position: absolute;
    left: -4px;
    top: 4px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: $dark;
  }

  @include for-large-up {
  }
}
</style>
