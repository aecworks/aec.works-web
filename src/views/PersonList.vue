<template>
  <div class="wrapper">
    <div class="content">
      <h1>People</h1>

      <p v-for="profile in items" :key="profile.slug">
        <Avatar :profile="profile" />
      </p>
    </div>
    <div class="sidebar"></div>
  </div>
</template>

<script>
import api from '../api'
import Avatar from '@/components/Avatar'

export default {
  name: 'Person',
  metaInfo: {
    title: 'People',
  },
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
