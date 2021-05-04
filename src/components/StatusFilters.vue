<template>
  <div>
    <label class="mt-1">Moderation Status</label>
    <div class="filtering-options fill-x">
      <ul>
        <li
          v-for="status in options"
          :key="status"
          class="pointer small"
          :class="getSortStyle(status)"
          @click="handleStatusClick(status)"
        >
          {{ status | capitalize }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { popQuery } from '@/utils'

export default {
  name: 'StatusFilters',
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getSortStyle(status) {
      const isActive = this.$route.query.status == status
      const isNotSet = this.$route.query.status == null
      return isActive || (isNotSet && status == 'APPROVED') ? 'active' : ''
    },
    handleStatusClick(status) {
      const isAlready = Boolean(this.$route.query.status == status)

      if (isAlready) {
        popQuery(this.$router, this.$route.query, 'status')
      } else {
        this.$router.replace({ query: { ...this.$route.query, status: status } }).catch(() => {})
      }
      this.$nextTick(() => this.$emit('filtered'))
    },
  },
}
</script>

<style lang="scss" scoped>
.filtering-options {
  @include for-large-up {
    ul {
      direction: rtl;
    }
  }
  li {
    text-decoration: underline;
    text-decoration-color: $yellow;
    display: flex;
    color: $light-gray;
    img {
      display: none;
      margin-top: 0.15rem;
    }
    &.active {
      color: $dark;
      .arrow-down {
        display: block;
      }
      .arrow-up {
        display: none;
      }
    }
    &.reversed {
      color: $dark;
      .arrow-down {
        display: none;
      }
      .arrow-up {
        display: block;
      }
    }
  }
}
</style>
