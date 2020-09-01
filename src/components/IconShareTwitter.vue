<template>
  <div class="corner-ribbon top-right blue">
    <a :href="`https://twitter.com/intent/tweet?text=${tweetText}`">
      <Icon icon="twitter" />
    </a>
  </div>
</template>

<script>
import Icon from './Icon.vue'

export default {
  name: 'IconShareTwitter',
  components: { Icon },
  data() {
    return {}
  },
  computed: {
    tweetText() {
      return `#aecworks ${document.location.href}`
    },
  },
}
</script>

<style lang="scss" scoped>
// https://codepen.io/eode9/pen/twkKm
</style>
