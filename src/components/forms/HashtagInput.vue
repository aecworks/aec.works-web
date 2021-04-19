<template>
  <div class="fill-x">
    <vue-tags-input
      id="input-hashtags"
      v-model="tag"
      placeholder="hashtags"
      :validation="validation"
      :tags.sync="tags"
      :autocomplete-items="filteredItems"
      :add-on-key="[13, 188]"
      :max-tags="4"
      @tags-changed="handleTagChanged"
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
          rule: (tag) => tag.text.length < 2,
          disableAdd: true,
        },
      ],
    }
  },
  computed: {
    filteredItems() {
      return this.existingHashtags.filter((i) => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1
      })
    },
  },
  mounted() {
    this.tags = this.initialTags.map((slug) => ({ text: slug }))
  },
  async created() {
    const hashtagsResponse = await api.getHashtags()
    this.existingHashtags = hashtagsResponse
      .map(({ slug }) => ({ text: slug }))
      .sort((a, b) => a.text.localeCompare(b.text))

    // Listen on for external adds
    bus.$on(EVENTS.HASHTAG_CLICKED, (slug) => {
      if (!this.tags.find((t) => t.text === slug)) {
        this.tags.push({ text: slug })
      } else {
        this.tags = this.tags.filter((t) => t.text !== slug)
      }
      this.handleTagChanged(this.tags)
    })
  },
  methods: {
    handleTagChanged(newTags) {
      this.tags = newTags
      this.$emit(
        'changed',
        newTags.map((tag) => tag.text),
      )
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
  text-align: left;
  &:focus-within {
    @include shadow-color($dark);
  }
}

.vue-tags-input .ti-autocomplete {
  margin-top: 8px;
  @extend .border-thin;
}

.vue-tags-input .ti-input {
  border: none !important;
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
