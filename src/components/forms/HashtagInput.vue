<template>
  <div class="fill-x">
    <vue-tags-input
      :validation="validation"
      v-model="tag"
      :tags="tags"
      :autocomplete-items="filteredItems"
      :add-on-key="[13,188]"
      @tags-changed="handleTagChanged"
    />
  </div>
</template>

<script>
import api from '@/api'

import VueTagsInput from '@johmun/vue-tags-input'
export default {
  name: 'HashtagInput',
  components: { VueTagsInput },
  props: {},
  data() {
    return {
      tag: '',
      tags: [],
      existingHashtags: [],
      validation: [
        {
          classes: 'min-length',
          rule: tag => tag.text.length < 3,
          disableAdd: true,
        },
      ],
    }
  },
  async mounted() {
    const hashtagsResponse = await api.getHashtags()
    this.existingHashtags = hashtagsResponse.map(({ slug }) => ({ text: slug }))
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
  background-color: $dark;
}

.vue-tags-input .ti-tags .ti-tag.ti-deletion-mark {
  background-color: $red !important;
}
</style>
