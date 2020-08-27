<template>
  <div class="content flex flex-down">
    <div class="flex">
      <div class="page" v-if="company">
        <h2 class="page-title editable" data-field="name">{{ company.name }}</h2>

        <div class="mt-2">
          <!-- <EditableText v-model="company.description" :editable="editing" /> -->
          <p
            class="editable"
            data-field="description"
            contenteditable="false"
          >{{ company.description }}</p>
        </div>

        <div class="mt-2">
          <Hashtag v-for="slug in company.hashtags" :slug="slug" :key="slug" />
          <EditableText
            class="editable"
            v-model="company.hashtags"
            :editable="editing"
            data-field="hashtags"
          />
        </div>

        <div class="mt-2">
          <IconCounter icon="pencil" value="Edit" @click="handleStartEdit" v-if="!editing" />
          <!-- <img v-if="!editing" src="@/assets/images/pencil.svg" /> -->
          <!-- <span v-if="!editing" class="small muted pointer" @click="handleStartEdit">Edit</span> -->
          <Button v-if="editing" text="Save" @click="handleSave" />
          <Button v-if="editing" text="Cancel" @click="handleCancel" />
        </div>
      </div>

      <div class="sidebar" v-if="company">
        <div class="company-icon">
          <img src="https://pbs.twimg.com/profile_images/1150588363503570944/tfnBg-3D_400x400.png" />
        </div>
        <div class="company-facts">
          <!-- <div v-for="field in getFields().filter(({label}) => label)" :key="field.name">
            <label v-if="field.label">{{field.label}}</label>
            <p class="editable small" :data-field="field.key">
              <a v-if="field.href" :href="field.href(company)">{{ company[field.key] || "-"}}</a>
              <span v-else>{{ company[field.key] || "-"}}</span>
            </p>
          </div>-->
          <label>Website</label>
          <a :href="company.website">
            <p class="editable small" data-field="website">{{company.website | cleanUrl}}</p>
          </a>
          <label>Headquarter</label>
          <p class="editable small" data-field="location">{{ company.location || "-"}}</p>
          <label>Employees</label>
          <p class="editable small" data-field="employeeCount">{{ company.employeeCount || "-" }}</p>
          <label>Founded</label>
          <p class="editable small" data-field="foundedDate">{{ company.foundedDate || "-" }}</p>
          <label>Twitter</label>
          <p class="editable small" data-field="twitterHandle">
            <a :href="`https://www.twitter.com/${company.twitterHandle}`">
              <span class="editable">{{ company.twitterHandle || "-" }}</span>
            </a>
          </p>
          <label>Crunchbase</label>
          <p class="editable small" data-field="crunchbaseId">
            <a :href="`https://www.crunchbase.com/organization/${company.crunchbaseId}`">
              <span class="editable">{{ company.crunchbaseId || "-" }}</span>
            </a>
          </p>
        </div>
      </div>
    </div>
    <Discussion v-if="company && company.thread" :threadId="company.thread" />
    <!-- TODO Revise Contant-Page-Discussion -->
  </div>
</template>

<script>
// import EditableText from '../components/forms/EditableText.vue'
import api from '@/api'
import Button from '../components/forms/Button.vue'
import Discussion from '@/components/Discussion'
import Hashtag from '@/components/Hashtag'
import IconCounter from '../components/IconCounter.vue'
import { waitForLogin } from '@/mixins'

export default {
  name: 'Company',
  components: {
    Discussion,
    Hashtag,
    Button,
    IconCounter,
    // EditableText
  },
  props: {
    slug: { required: true, type: String },
  },
  data() {
    return {
      errors: [],
      company: null,
      editing: null,
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
    handleStartEdit() {
      waitForLogin().then(() => {
        this.editing = !this.editing
        document.querySelectorAll('.editable').forEach(node => {
          node.contentEditable = true
          node.classList.toggle('editing')
        })
      })
    },
    handleCancel() {
      this.editing = false
      this.company = null
      this.fetchData()
    },
    async handleSave() {
      const payload = {}
      document.querySelectorAll('.editable').forEach(node => {
        let value = node.textContent

        if (value.includes('[')) {
          value = JSON.parse(value)
        }
        if (value !== '-') {
          payload[node.dataset.field] = value
        }
      })
      const company = await api.patchCompany(this.company.slug, payload)
      this.handleCancel() // TODO rename
    },
    getFields() {
      return [
        { key: 'name', label: null },
        { key: 'description', label: null },
        { key: 'website', label: 'Website', href: c => c.href },
        { key: 'location', label: 'Location' },
        // { key: 'employeeCount', label: 'Employee Count' },
        // { key: 'foundedDate', label: 'Founded' },
        {
          key: 'twitterHandle',
          label: 'Twitter',
          href: c => `https://www.twitter.com/${c.twitterHandle}`,
        },
        {
          key: 'crunchbaseId',
          label: 'Crunchbase',
          href: c => `https://www.crunchbase.com/organization/${c.crunchbaseId}`,
        },
      ]
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
.editing {
  color: $dark;
  display: inline-block;
  border-bottom: 2px solid $dark-gray;
  // padding-left: 0.5rem;
  // border-left: 1px solid $yellow;
  // border-bottom: 1px solid $yellow;
  // display: inline-block;
  // background-color: $cream;
}

.company-icon {
  text-align: right;
  img {
    height: 50px;
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
  label {
    color: $dark;
    font-weight: 600;
  }
}
</style>
