<template>
  <div class="page">
    <div class="page-header">
      <!-- <h2 class="page-title">People</h2> -->
      <h2 class="page-title">WIP</h2>
    </div>

    <div class="page-content">
      <p v-for="profile in items" :key="profile.id">
        <Avatar :profile="profile" />
      </p>
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
