<template>
  <div id="social">
    <a
      href="https://github.com/aecworks"
      :class="gIconExpanded ? 'social-icon--container-active' : 'social-icon--container'"
      @mouseover="gHandleExpand"
      @mouseout="gHandleCollapse"
    >
      <img
        alt="Github"
        :class="gIconExpanded ? 'social-icon-active' : 'social-icon'"
        src="@/assets/images/social-icons/github.svg"
      />
      <div :class="gIconExpanded ? 'social-icon--text-active' : 'social-icon--text'">Github</div>
    </a>
    <a
      href="https://twitter.com/gtalarico"
      :class="tIconExpanded ? 'social-icon--container-active' : 'social-icon--container'"
      @mouseover="tHandleExpand"
      @mouseout="tHandleCollapse"
    >
      <img
        alt="Twitter"
        :class="tIconExpanded ? 'social-icon-active' : 'social-icon'"
        src="@/assets/images/social-icons/twitter.svg"
      />
      <div :class="tIconExpanded ? 'social-icon--text-active' : 'social-icon--text'">Twitter</div>
    </a>
    <a
      href="https://twitter.com/gtalarico"
      :class="aIconExpanded ? 'social-icon--container-active' : 'social-icon--container'"
      @mouseover="aHandleExpand"
      @mouseout="aHandleCollapse"
    >
      <img
        alt="About"
        :class="aIconExpanded ? 'social-icon-active' : 'social-icon'"
        src="@/assets/images/social-icons/about.svg"
      />
      <div :class="aIconExpanded ? 'social-icon--text-active' : 'social-icon--text'">About</div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'SocialIcons',
  data() {
    return {
      gIconExpanded: false,
      tIconExpanded: false,
      aIconExpanded: false,
    }
  },
  methods: {
    gHandleExpand: function () {
      this.gIconExpanded = true
    },
    gHandleCollapse: function () {
      this.gIconExpanded = false
    },
    tHandleExpand: function () {
      this.tIconExpanded = true
    },
    tHandleCollapse: function () {
      this.tIconExpanded = false
    },
    aHandleExpand: function () {
      this.aIconExpanded = true
    },
    aHandleCollapse: function () {
      this.aIconExpanded = false
    },
  },
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
    width: 32px;
  }
  @include for-large-down {
    top: calc(100vh - 32px - 1rem);
    z-index: 3;
  }
}

.social-icon--container,
.social-icon--container-active {
  direction: ltr;
  align-items: center;
  background-color: #fff;
  display: flex;
  border: 1px solid #333;
  border-radius: 2px;
  height: 32px;
  margin: 0.25rem 0;
  @include for-large-down {
    width: 32px;
    margin: 0 0.25rem;
    box-shadow: 3px 3px 0px #32312d;
  }
}

.social-icon--container {
  justify-content: center;
}

.social-icon--container-active {
  width: 120px;
  justify-content: center;
  padding: 0 0.25rem;
  box-shadow: 3px 3px 0px #32312d;
}

.social-icon--text {
  display: none;
}

.social-icon--text-active {
  display: block;
}

.social-icon-active {
  margin-right: 1rem;
}
</style>
