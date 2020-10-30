<template>
  <div id="social">
    <a href="https://github.com/aecworks" class="social-icon--container">
      <div class="social-icon--icon">
        <img alt="Github" src="@/assets/images/social-icons/github.svg" />
      </div>
      <div class="social-icon--text">Github</div>
    </a>
    <a href="https://twitter.com/aec_works" class="social-icon--container">
      <div class="social-icon--icon">
        <img alt="Twitter" src="@/assets/images/social-icons/twitter.svg" />
      </div>
      <div class="social-icon--text">Twitter</div>
    </a>
    <!-- <a href="/about" class="social-icon--container">
      <div class="social-icon--icon">
        <img alt="About" src="@/assets/images/social-icons/about.svg" />
      </div>
      <div class="social-icon--text">About</div>
    </a> -->
  </div>
</template>

<script>
export default {
  name: 'SocialIcons',
}
</script>

<style lang="scss" scoped>
#social {
  z-index: 2;
  position: fixed;
  display: flex;
  align-items: flex-end;
  @include for-large-up {
    right: 0;
    top: 50vh;
    margin-right: 1rem;
    flex-direction: column;
  }
  @include for-large-down {
    top: calc(100vh - 32px - 1rem);
    z-index: 3;
  }
}

.social-icon--container {
  align-items: center;
  background-color: #fff;
  display: flex;
  @extend .border-thin;
  margin: 0.25rem 0;

  @include for-large-down {
    margin: 0 0.25rem;
    @include shadow-color($dark);
  }

  overflow-y: hidden;
  height: 32px;
  max-width: 32px;
  transition: max-width 200ms ease-in-out;

  &:hover {
    max-width: 100px;
  }

  .social-icon--icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    padding: 2px 4px;
    text-align: center;
  }

  .social-icon--text {
    align-self: space-between;
    font-family: $font-family;
    font-weight: $font-weight-bold;
    padding: 0 8px;
  }
}
</style>
