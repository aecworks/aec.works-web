<template>
  <div class="fill-x">
    <vue-tags-input
      :validation="validation"
      v-model="tag"
      :tags.sync="tags"
      :autocomplete-items="filteredItems"
      :add-on-key="[13,188]"
      @tags-changed="handleTagChanged"
      :max-tags="4"
    />
  </div>
</template>

<script>
import api from '@/api'
import { bus, EVENTS } from '@/events'

import VueTagsInput from '@johmun/vue-tags-input'
export default {
  name: 'HashtagInput',
  components: { VueTagsInput },
  props: {
    initialTags: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      tag: '',
      tags: [],
      existingHashtags: [],
      validation: [
        {
          classes: 'min-length',
          rule: tag => tag.text.length < 2,
          disableAdd: true,
        },
      ],
    }
  },
  mounted() {
    this.tags = this.initialTags.map(slug => ({ text: slug }))
  },
  async created() {
    const hashtagsResponse = await api.getHashtags()
    this.existingHashtags = hashtagsResponse.map(({ slug }) => ({ text: slug }))

    // Listen on for external adds
    bus.$on(EVENTS.HASHTAG_CLICKED, slug => {
      if (!this.tags.find(t => t.text === slug)) {
        this.tags.push({ text: slug })
      } else {
        this.tags = this.tags.filter(t => t.text !== slug)
      }
      this.handleTagChanged(this.tags)
    })
  },
  methods: {
    handleTagChanged(newTags) {
      this.tags = newTags
      this.$emit(
        'changed',
        newTags.map(tag => tag.text),
      )
    },
  },
  computed: {
    filteredItems() {
      return this.existingHashtags.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1
      })
    },
  },
  method: {},
}
</script>


<style lang="scss">
.vue-tags-input {
  @extend .input;
  max-width: none !important;
  padding: 0;
  &:focus-within {
    @include shadow-color($dark);
  }
}

.vue-tags-input .ti-autocomplete {
  margin-top: 8px;
  @extend .border-thin;
}

.vue-tags-input .ti-input {
  border: none;
}

.vue-tags-input .ti-tag {
  background-color: $dark !important;
  padding: 0.25rem 0.55rem;
}

.vue-tags-input .ti-item.ti-selected-item {
  background-color: $dark !important;
}

.vue-tags-input .ti-tags .ti-tag.ti-deletion-mark {
  background-color: $red !important;
}
</style>
