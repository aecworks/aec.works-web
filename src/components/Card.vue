<template>
  <div class="c-card" @click="handleCardClick">
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
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    showImage: {
      default: true,
    },
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    handleCardClick() {
      this.$emit('click')
    },
  },
}
</script>

<style lang="scss" scoped>
.c-card {
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  width: 100%;

  @extend .border-thin;
  @include shadow-color($dark);
  // &:hover {
  //   @include shadow-color($dark);
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
}
</style>
