<template>
  <div>
    <LinkedInShare button_design="outline" has_square_edges has_icon :page_url="pageUrl" />
    <TwitterShare button_design="outline" has_square_edges has_icon :page_url="pageUrl" />
  </div>
</template>

<script>
import LinkedInShare from 'vue-goodshare/src/providers/LinkedIn.vue'
import TwitterShare from 'vue-goodshare/src/providers/Twitter.vue'

export default {
  name: 'SocialShare',
  components: { LinkedInShare, TwitterShare },
  props: ['pageUrl'],
  data() {
    return {}
  },
  computed: {},
}
</script>

<style lang="scss" scoped>
// Todo
</style>
