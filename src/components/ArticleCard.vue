<template>
  <Card>
    <template v-slot:cover>
      <img v-if="ogData.image" :src="ogData.image" />
    </template>
    <template v-slot:default>
      <label>{{ ogData.siteName }}</label>
      <h2 class>
        <a :href="ogData.url">{{ ogData.title }}</a>
      </h2>
      <p class="mt-1">{{ ogData.description }}</p>
    </template>
  </Card>
</template>

<script>
import Card from './Card.vue'
export default {
  name: 'ArticleCard',
  components: { Card },
  props: ['article'],
  data() {
    return {
      isLoading: true,
    }
  },
  computed: {
    ogData() {
      return this.article.opengraphData
    },
  },
  async created() {
    this.isLoading = false
    // TODO
    // api.getOpenGraph()
  },
}
</script>

<style lang="scss">
.card-article {
  width: 50px;
}
</style>
