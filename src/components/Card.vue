<template>
  <div class="c-card">
    <div v-if="showImage" class="c-card__image" href="#">
      <div class="c-card__image__logo">
        <slot name="logo" />
      </div>
      <div class="c-card__image__cover">
        <slot name="cover" />
      </div>
    </div>
    <div class="c-card__content">
      <slot />
    </div>
    <div class="c-card__ribbon">
      <Ribbon v-if="banner" :text="banner" />
    </div>
  </div>
</template>

<script>
import Ribbon from './Ribbon.vue'
export default {
  name: 'Card',
  components: { Ribbon },
  props: {
    banner: {
      type: String,
      default: '',
    },
    showImage: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.c-card {
  // overflow: hidden; // breaks editor in card
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  width: 100%;
  z-index: 1;

  @extend .border-thin;
  @include shadow-color($dark);
  // &:hover {
  //   @include shadow-color($dark-gray);
  // }

  .c-card__content {
    padding: $padding;
    display: flex;
    flex-direction: column;
  }
  .c-card__image {
    display: flex;
    position: relative;
    // border-bottom: 2px solid $dark;

    .c-card__image__cover {
      // min-height: 50px;
      min-height: 50px;
      background-color: $cream;
      max-height: 200px;
      width: 100%;

      // Match Card Radius
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;

      overflow: hidden;
      img {
        display: block; // Remove gap below image
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    .c-card__image__fallback {
      // height: 100px;
      width: 100%;
      background-color: $dark;
    }
  }
  .c-card__ribbon {
    pointer-events: none;
    z-index: 1;
    padding: 0;
    margin: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
