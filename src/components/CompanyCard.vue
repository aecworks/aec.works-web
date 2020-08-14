<template>
  <Card @click="handleClick(company)">
    <template v-slot:logo>
      <img class="company-logo" v-if="company.logo" :src="getImageUrl(company.logo)" />
    </template>
    <template v-slot:cover>
      <img v-if="company.cover" :src="getImageUrl(company.cover)" />
    </template>
    <template v-slot:default>
      <!-- Company Name -->
      <h3 class="mt-1">{{company.name}}</h3>

      <!-- Company Description -->
      <p class="mt-1">{{company.description || "-"}}</p>

      <!-- Company Hashtags -->
      <div class="mt-1">
        <Hashtag v-for="slug in company.hashtags" :slug="slug" :key="slug" />
      </div>

      <!-- Footer -->
      <div class="flex mt-1">
        <IconCounter :icon="'chat'" :count="5" />
        <IconCounter :icon="'clap'" :count="2" />
        <span class="small flex-right">{{company.location}}</span>
      </div>
    </template>
  </Card>
</template>

<script>
import Card from './Card.vue'
import Hashtag from '@/components/Hashtag'
import IconCounter from '@/components/IconCounter'
// import moment from 'moment'

export default {
  name: 'CompanyCard',
  props: ['company'],
  components: { Hashtag, IconCounter, Card },
  // created() {
  //   window.addEventListener('scroll', this.handleScroll)
  // },
  // destroyed() {
  //   window.removeEventListener('scroll', this.handleScroll)
  // },
  methods: {
    handleClick(company) {
      console.log('test')
      this.$router.push({ name: 'Company', params: { slug: company.slug } })
    },
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
.company-logo {
  position: absolute;
  right: 30px;
  bottom: -30px;
  width: 60px;
  height: 60px;
  @extend .border-thick;
}
// .company-card-container {
//   align-items: flex-start;

//   .company-card-image {
//     display: inline-block;
//     line-height: 0;
//     width: 100%;

//     .company-card-image-container {
//       display: inline-block;
//       overflow: hidden;
//       @include for-large-up {
//         height: 5rem;
//       }
//       max-width: 100%;

//       @include shadow-color($dark);
//       @extend .border-thick;
//       border-bottom-right-radius: 0;
//       border-bottom-left-radius: 0;
//       margin-bottom: -3px;

//       img {
//         max-height: 100%;
//         max-width: 100%;
//         object-fit: center;
//         object-position: center;
//       }
//     }
//   }

//   .company-card {
//     display: inline-block;
//     width: 100%;
//     margin-bottom: 2rem;
//     padding: $padding;
//     background-color: white;

//     @extend .border-thick;
//     border-top-left-radius: 0;
//     @include shadow-color($dark);

//     @include for-large-up {
//       width: 100%;
//     }

//     .company-card-title {
//       margin-bottom: 0.5rem;
//       .company-location {
//         margin-left: auto;
//         @extend .muted;
//       }
//     }

//     .company-card-hashtags {
//       margin-bottom: 1rem;
//     }

//     .company-card-description {
//       @extend .muted;
//     }
//   }
// }
</style>
