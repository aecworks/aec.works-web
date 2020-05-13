<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">People</h2>
    </div>

    <div class="page-content">
      <p v-for="profile in items" :key="profile.id">
        <Profile :profile="profile" />
      </p>
    </div>
  </div>
</template>

<script>
import api from '../api'
import Profile from '@/components/Profile'

export default {
  name: 'Person',
  components: { Profile },
  props: ['id'],
  data() {
    return {
      items: [],
    }
  },
  async created() {
    const { results: items } = await api.getProfiles()
    this.items = items
  },
  methods: {},
}
</script>
