<template>
  <div class="content flex">
    <div class="page">
      <h1 class="page-title">{{ isEditing ? "Edit" : "New"}}</h1>

      <form class="form">
        <label>Name</label>
        <input type="text" class="fill-x" v-model="company.name" />
        <label>Description</label>
        <input type="text" class="fill-x" v-model="company.description" />
        <label>Location</label>
        <input type="text" class="fill-x" v-model="company.location" />
        <label>Website</label>
        <input type="text" class="fill-x" v-model="company.website" />
        <label>Twitter handle</label>
        <input type="text" class="fill-x" v-model="company.twitterHandle" />
        <label>Crunchbase id</label>
        <input type="text" class="fill-x" v-model="company.crunchbaseId" />
        <label>Hashtags</label>
        <input type="text" class="fill-x" v-model="company.hashtags" />
        <label>Logo</label>
        <input type="text" class="fill-x" v-model="company.logo" />
        <label>Cover</label>
        <input type="text" class="fill-x" v-model="company.cover" />

        <Button text="Save" @click="handleSave" />
        <Button text="Cancel" @click="handleCancel" />
      </form>

      <!-- <FormulateForm v-model="company" :schema="getSchema()" @submit="submitHandler" /> -->
    </div>
    <div class="sidebar">
      <div v-for="rev in revisions" :key="rev.id">
        <Avatar :profile="rev.createdBy" />
        Revision: {{rev.id}}
        <br />
        Date: {{rev.createdAt}}
      </div>
    </div>
  </div>
</template>

<script>
import Button from '../components/forms/Button.vue'
import Avatar from '../components/Avatar.vue'
import api from '@/api'
// import Hashtag from '@/components/Hashtag'
import { waitForLogin } from '@/mixins'

export default {
  name: 'Company',
  components: { Avatar, Button },
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
        logo: '',
        cover: '',
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
      const payload = this.company
      await api.postCompanyRevision(this.company.slug, payload)
    },
    handleCancel() {
      if (this.isEditing) {
        this.$router.push({ name: 'Company', params: { slug: this.slug } })
      } else {
        this.$router.push({ name: 'CompanyList' })
      }
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
  margin-top: 1rem;
  @include for-large-up {
    text-align: right;
  }
}
</style>
