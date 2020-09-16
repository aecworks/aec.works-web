<template>
  <div>
    <Loader v-if="isLoading" />
    <a :href="url">{{url}}</a>
  </div>
</template>

<script>
import Loader from './Loader.vue'

export default {
  name: 'ArticleCard',
  components: { Loader },
  data() {
    return {
      isLoading: true,
      title: '',
      description: '',
    }
  },
  props: ['url'],
  computed: {},
  async created() {
    this.isLoading = false
    // TODO
    // api.getOpenGraph()
  },
}
</script>

<style lang="scss">
</style>
