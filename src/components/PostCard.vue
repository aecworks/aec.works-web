<template>
  <div class="post-card">
    <h3 class="post-card-title">
      <router-link :to="{ name: 'Post', params: { id: post.id }}">{{post.title}}</router-link>
    </h3>
    <p class="post-card-author">{{ post.profile.name }}</p>
    
    <div class="flex flex-center post-card-footer">
      <IconCounter :icon="'chat'" :count="post.commentCount" />
      <IconCounter :icon="'clap'" :count="localClapCount || post.clapCount" @click="onClapClick"/>
    </div>

  </div>
</template>

<script>
import api from '@/api'
import IconCounter from '@/components/IconCounter'

export default {
  name: 'PostCard',
  props: ['post'],
  components: { IconCounter },
  data() {
    return {
      localClapCount: null
    }
  },
  methods: {
    async onClapClick() {
      const clapCount = await api.postPostClap(this.post.id)
      this.localClapCount = clapCount
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.post-card {
  display: inline-block;
  width: 10rem;
  margin-bottom: 2rem;

  background-color: white;
  padding: $padding;
  border: 2px $dark solid;
  border-radius: 5px;

  @include shadow-color($dark);
  
  width: 100%;
  @include for-large-up {
    width: 80%;
  }


  .post-card-title {
    margin-bottom: 1rem;
  }

  .post-card-author {
    margin-bottom: 1rem;
  }

  .post-card-footer {
    display: flex;
    > * {
      margin-right: 1rem;
    }

  }
}
</style>
