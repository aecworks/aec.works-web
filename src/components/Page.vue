<template>
  <div class="page">
    <h2 class="page-title">
      <slot name="title"></slot>
    </h2>

    <div class="page-content">
      <slot name="content" />
    </div>
    <!-- <div v-html="blogPage.body"></div> -->
  </div>
</template>

<script>
// import api from '@/api'

export default {
  name: 'Page',
  components: {},
  props: ['id'],
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>
