<template>
  <div class="company-card-container flex flex-down">
    <div class="company-card-image">
      <div class="company-card-image-container">
        <img :src="getImageUrl(company.logo)" />
      </div>
    </div>

    <div class="company-card">
      <div class="company-card-title flex">
        <h3>
          <router-link :to="{ name: 'Company', params: { slug: company.slug }}">{{company.name}}</router-link>
        </h3>
        <h4 class="company-location">{{company.location || "-"}}</h4>
      </div>

      <div class="company-card-description">
        <p>{{company.description || "-"}}</p>
      </div>
      <div class="company-card-hashtags">
        <Hashtag v-for="slug in company.hashtags" :slug="slug" :key="slug" />
      </div>

      <div class="company-card-footer flex flex-center">
        <IconCounter :icon="'chat'" :count="5" />
        <IconCounter :icon="'clap'" :count="2" />
      </div>
    </div>
  </div>
</template>

<script>
import Hashtag from '@/components/Hashtag'
import IconCounter from '@/components/IconCounter'
// import moment from 'moment'

export default {
  name: 'CompanyCard',
  props: ['company'],
  components: { Hashtag, IconCounter },
  // created() {
  //   window.addEventListener('scroll', this.handleScroll)
  // },
  // destroyed() {
  //   window.removeEventListener('scroll', this.handleScroll)
  // },
  methods: {
    // handleScroll(e) {
    //   document.querySelectorAll('.company-card-image-container').forEach(el => {
    //     // let { y } = el.getBoundingClientRect()
    //     // let scale = y * 2 + window.screen.height
    //   })
    // },
    getImageUrl(logo) {
      if (logo) {
        return logo
      } else {
        return 'https://api.adorable.io/avatars/285/abott@adorable.png'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.company-card-container {
  align-items: flex-start;

  .company-card-image {
    display: inline-block;
    line-height: 0;
    width: 100%;

    .company-card-image-container {
      display: inline-block;
      overflow: hidden;
      @include for-large-up {
        height: 5rem;
      }
      max-width: 100%;

      @include shadow-color($dark);
      @extend .border-thick;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      margin-bottom: -3px;

      img {
        max-height: 100%;
        max-width: 100%;
        object-fit: center;
        object-position: center;
      }
    }
  }

  .company-card {
    display: inline-block;
    width: 100%;
    margin-bottom: 2rem;
    padding: $padding;
    background-color: white;

    @extend .border-thick;
    border-top-left-radius: 0;
    @include shadow-color($dark);

    @include for-large-up {
      width: 100%;
    }

    .company-card-title {
      margin-bottom: 0.5rem;
      .company-location {
        margin-left: auto;
        @extend .muted;
      }
    }

    .company-card-hashtags {
      margin-bottom: 1rem;
    }

    .company-card-description {
      @extend .muted;
    }
  }
}
</style>
