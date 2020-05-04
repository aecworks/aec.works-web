<template>
  <div class="page">
    <div v-if="person">
      <h3 class="page-title">{{ person.email }}</h3>
      <p>{{ person.twitter }}</p>
      <p>{{ person.location }}</p>

      <a
        class="twitter-timeline"
        data-width="600"
        data-height="400"
        data-dnt="true"
        data-theme="dark"
        :href="`https://twitter.com/${person.twitter}`"
      >Tweets by {{person.twitter}}</a>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'Person',
  components: {},
  props: ['id'],
  data() {
    return {
      errors: [],
      person: null,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const response = await api.getProfile(this.id)
      if (!response.message) {
        this.person = response
      } else {
        this.errors.push(response.message)
      }
    },
  },
}
</script>
