<template>
  <div class="content">
    <div class="page">
      <div class="page-header">
        <h1 class="page-title">People</h1>
      </div>

      <div class="page-content">
        <p v-for="profile in items" :key="profile.id">
          <Avatar :profile="profile" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
import Avatar from '@/components/Avatar'

export default {
  name: 'Person',
  components: { Avatar },
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
