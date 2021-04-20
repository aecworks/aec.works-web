<template>
  <div>
    <label class="mt-1">Sorting</label>
    <div class="sorting-options fill-x">
      <ul>
        <li
          v-for="paramName in sortingOptions"
          :key="paramName"
          class="pointer small"
          :class="getSortStyle(paramName)"
          @click="handleSortChange(paramName)"
        >
          <img class="arrow-down" :src="require(`@/assets/images/arrow-down.svg`)" height="12" />
          <img class="arrow-up" :src="require(`@/assets/images/arrow-up.svg`)" height="12" />
          {{ paramName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { popQuery } from '@/utils'

export default {
  data() {
    return {
      sortingOptions: ['claps', 'name', 'updated'],
    }
  },
  methods: {
    getSortStyle(sortBy) {
      const isActive = this.$route.query.sort == sortBy
      const isReverse = this.$route.query.reverse
      return (isActive ? 'active' : '') + ' ' + (isActive && isReverse ? 'reversed' : '')
    },
    handleSortChange(sortBy) {
      const isAlready = Boolean(this.$route.query.sort == sortBy)
      const isReversed = Boolean(this.$route.query.reverse)
      if (isAlready && !isReversed) {
        this.$router.replace({ query: { ...this.$route.query, reverse: 1 } }).catch(() => {})
      } else if (isAlready && isReversed) {
        popQuery(this.$router, this.$route.query, 'reverse')
      } else {
        this.$router.replace({ query: { ...this.$route.query, sort: sortBy } }).catch(() => {})
        if (isReversed) {
          popQuery(this.$router, this.$route.query, 'reverse')
        }
      }
      // this.refetch()
      this.$emit('sort')
    },
  },
}
</script>

<style lang="scss" scoped>
.sorting-options {
  display: flex;
  @include for-large-up {
    justify-content: flex-end;
  }
  ul {
    display: flex;
  }
  li {
    text-decoration: underline;
    text-decoration-color: $yellow;
    &:not(:last-child) {
      margin-right: 1rem;
    }
    display: flex;
    align-items: center;
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
