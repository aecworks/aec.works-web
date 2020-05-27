<template>
  <div class="company-card-container flex flex-down">
    <div class="company-card-icon-container">
      <div class="company-card-icon">
        <img :src="getImageUrl(company.logo)" />
      </div>
    </div>

    <div class="company-card" @click="onClick">
      <div class="company-card-title flex">
        <h3>{{ company.name }}</h3>
        <h4 class="company-location">{{company.location || "-"}}</h4>
      </div>

      <div class="company-card-description">
        <p>{{company.description || "-"}}</p>
      </div>
      <div class="company-card-hashtags">
        <Hashtag v-for="name in company.hashtags" :name="name" :key="name" />
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
import moment from 'moment'

export default {
  name: 'CompanyCard',
  props: ['company'],
  components: { Hashtag, IconCounter },
  methods: {
    onClick() {
      this.$router.push({
        name: 'Company',
        params: { id: this.company.id },
      })
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
$logosize: 5rem;

.company-card-container {
  align-items: flex-start;

  .company-card-icon-container {
    display: inline-block;
    line-height: 0;

    .company-card-icon {
      display: inline-block;
      height: $logosize;
      overflow: hidden;
      max-width: $logosize * 2;

      @include shadow-color($dark);
      @extend .border-thick;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      margin-bottom: -3px;

      img {
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }

  .company-card {
    display: inline-block;
    width: 10rem;
    margin-bottom: 2rem;
    padding: $padding;
    background-color: white;

    @extend .border-thick;
    border-top-left-radius: 0;
    @include shadow-color($dark);

    width: 100%;
    @include for-large-up {
      width: 80%;
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
