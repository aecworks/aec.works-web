<template>
  <div class="content">
    <div class="page" v-if="company">
      <div class="page-header">
        <h2 class="page-title editable" data-field="name">
          {{ company.name }}
          <div class="title-edit" @click="handleStartEdit">
            <img v-if="!editing" src="@/assets/images/pencil.svg" />
            <label v-if="editing" @click="handleDoneEdit">Save</label>
            <label v-if="editing">Cancel</label>
          </div>
        </h2>

        <div class="company-description">
          <p
            class="editable"
            data-field="description"
            contenteditable="false"
          >{{ company.description }}</p>
        </div>

        <div class="company-hashtags">
          <Hashtag v-for="slug in company.hashtags" :slug="slug" :key="slug" />
        </div>
      </div>
      <Discussion :threadId="company.thread" />
    </div>

    <div class="sidebar" v-if="company">
      <div class="company-icon">
        <img src="https://pbs.twimg.com/profile_images/1150588363503570944/tfnBg-3D_400x400.png" />
      </div>
      <div class="company-facts">
        <label>Website</label>
        <a :href="company.website">
          <p class="editable small" data-field="website">{{company.website | cleanUrl}}</p>
        </a>
        <label>Employees</label>
        <p class="editable small" data-field="employee_count">{{ company.employee_count || "-" }}</p>
        <label>Founded</label>
        <p class="editable small" data-field="founded_date">{{ company.founded_date || "-" }}</p>
        <label>Twitter</label>
        <p class="editable small" data-field="twitter">{{ company.twitter || "-" }}</p>
        <label>Headquarter</label>
        <p class="editable small" data-field="headquarter">{{ company.headquarter || "-"}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Discussion from '@/components/Discussion'
import Hashtag from '@/components/Hashtag'
import api from '@/api'

export default {
  name: 'Company',
  components: { Discussion, Hashtag },
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
    handleStartEdit(e) {
      this.editing = !this.editing
      document.querySelectorAll('.editable').forEach(node => {
        node.contentEditable = true
        node.classList.toggle('editing')
      })
    },
    handleDoneEdit(e) {
      const payload = {}
      document.querySelectorAll('.editable').forEach(node => {
        const value = node.textContent
        if (value !== '-') {
          payload[node.dataset.field] = node.textContent
        }
      })
      api.patchCompany(this.company.slug, payload)
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
// #twitter-widget-0 {
//   width: 100% !important;
//   // text-align: right;
// }

.editing {
}
.editing {
  border-left: 1px solid $yellow;
  padding-left: 0.5rem;
  color: $dark;
  background-color: $cream;
}

.title-edit {
  display: inline-block;
  float: right;
  cursor: pointer;
}

.company-icon {
  // position: absolute;
  // right: 0;
  // float: right;
  text-align: right;
  img {
    height: 50px;
  }
}

@include for-large-down {
  flex-wrap: wrap;
}

.company-description {
  margin-top: 2rem;
  @include for-large-up {
    padding-right: 2rem;
  }
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
