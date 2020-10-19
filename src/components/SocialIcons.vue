<template>
  <div id="social">
    <a href="https://github.com/aecworks" class="transition social-icon--container">
      <img alt="Github" src="@/assets/images/social-icons/github.svg" />
      <div class="social-icon--text">Github</div>
    </a>
    <a href="https://twitter.com/gtalarico" class="transition social-icon--container">
      <img alt="Twitter" src="@/assets/images/social-icons/twitter.svg" />
      <div class="social-icon--text">Twitter</div>
    </a>
    <a href="https://twitter.com/gtalarico" class="transition social-icon--container">
      <img alt="About" src="@/assets/images/social-icons/about.svg" />
      <div class="social-icon--text">About</div>
    </a>
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
  @include for-large-up {
    right: 0;
    top: 50vh;
    margin-right: 1rem;
    flex-direction: column;
    direction: rtl;
  }
  @include for-large-down {
    top: calc(100vh - 32px - 1rem);
    z-index: 3;
  }
}

.transition {
  width: 32px;
}

.transition:hover {
  width: 120px;
  transition: all 200ms;
}

.social-icon--container {
  direction: ltr;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  display: flex;
  @extend .border-thin;
  border-radius: 2px;
  height: 32px;
  margin: 0.25rem 0;

  @include for-large-down {
    width: 32px;
    margin: 0 0.25rem;
    @include shadow-color($dark);
  }

  & .social-icon--text {
    font-family: $font-family;
    font-weight: $font-weight-bold;
    display: none;
  }

  &:hover {
    @include shadow-color($dark);
    padding: 0 0.25rem;
    & .social-icon--text {
      font-family: $font-family;
      font-weight: $font-weight-bold;
      display: block;
      margin-left: 1rem;
    }
  }
}
</style>
