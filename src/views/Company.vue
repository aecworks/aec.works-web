<template>
  <div class="page">
    <div v-if="company">
      <div class="page-header">
        <h2 class="page-title">{{ company.name }}</h2>
        <!-- <img
          class="page-icon"
          src="https://pbs.twimg.com/profile_images/1150588363503570944/tfnBg-3D_400x400.png"
        />-->
      </div>

      <div class="company-content flex">
        <div class="company-bio">
          <p>{{ company.description }}</p>
        </div>
        <div class="company-facts">
          <a :href="company.website">
            <p>Website</p>
          </a>
          <label>Employees</label>
          <p class="small">{{ company.employee_count }}</p>
          <label>Founded</label>
          <p class="small">{{ company.founded_date }}</p>
          <label>Twitter</label>
          <p class="small">{{ company.twitter }}</p>
          <label>Headquarter</label>
          <p class="small">{{ company.headquarter }}</p>
        </div>
      </div>
      <div></div>
      <Discussion :threadId="company.commentThread" />
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Discussion from '@/components/Discussion'

export default {
  name: 'Company',
  components: { Discussion },
  props: ['id'],
  data() {
    return {
      errors: [],
      company: null,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const company = await api.getCompany(this.id)
      this.company = company
    },
  },
}
</script>

<style lang="scss">
// #twitter-widget-0 {
//   width: 100% !important;
//   // text-align: right;
// }
.company-content {
  margin-bottom: 2rem;
  flex: 0;

  @include for-large-down {
    flex-wrap: wrap;
  }

  .company-bio {
    @include for-large-up {
      padding-right: 2rem;
    }
  }
  .company-facts {
    @include for-large-up {
      flex-shrink: 0;
      margin-left: auto;
      text-align: right;
    }
  }
}
</style>
