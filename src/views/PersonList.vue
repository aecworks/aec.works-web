<template>
  <div class="wrapper">
    <div class="content">
      <div class="people-count">{{ items.length }} lovely people</div>
      <p v-for="profile in items" :key="profile.slug">
        <Avatar :profile="profile" />
      </p>
    </div>
    <div class="sidebar">
      <TextInput
        v-model="searchQuery"
        icon="search"
        placeholder="search"
        @input="handleSearchInput"
      />
    </div>
  </div>
</template>

<script>
import api from '../api'
import TextInput from '../components/forms/TextInput.vue'
import Avatar from '@/components/Avatar'

export default {
  name: 'Person',
  metaInfo: {
    title: 'People',
  },
  components: {
    Avatar,
    TextInput,
  },
  props: {
    search: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      items: [],
      searchQuery: '',
    }
  },
  computed: {},
  async created() {
    const { results: items } = await api.getProfiles()
    this.items = items
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.people-count {
  font-size: 0.9rem;
  color: $dark-gray;
  margin: 0 0 1rem 0;
}
</style>
