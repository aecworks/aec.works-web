<template>
  <Page>
    <template #title>People</template>
    <template #content>
      <p v-for="profile in items" :key="profile.id">
        <router-link :to="{ name: 'Person', params: { id: profile.id  }}">
          {{ profile.email }}
        </router-link>
      </p>
    </template>
  </Page>
</template>

<script>
import api from '../api'
import Page from '@/components/Page'

export default {
  name: 'Person',
  components: { Page },
  props: ['id'],
  data() {
    return {
      items: [],
    }
  },
  async created() {
    const { results: items  } = await api.getProfiles()
    this.items = items
  },
  methods: {},
}
</script>
