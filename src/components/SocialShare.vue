<template>
  <div>
    <LinkedInShare button_design="outline" has_square_edges has_icon :page_url="url" />
    <br />
    <TwitterShare button_design="outline" has_square_edges has_icon :page_url="url" />
  </div>
</template>

<script>
import LinkedInShare from 'vue-goodshare/src/providers/LinkedIn.vue'
import TwitterShare from 'vue-goodshare/src/providers/Twitter.vue'

export default {
  name: 'SocialShare',
  components: { LinkedInShare, TwitterShare },
  props: {
    pageUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    url() {
      return this.pageUrl || document.location.href
    },
  },
}
</script>

<style lang="scss" scoped></style>
