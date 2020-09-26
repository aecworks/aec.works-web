<template>
  <div>
    <input
      id="autocomplete"
      v-model="query"
      v-bind="$attrs"
      type="text"
      class="input fill-x"
      @blur="checkInput"
      @input="resetSelection"
    />
  </div>
</template>

<script>
import gmapsInit from '../libs/gmaps'

export default {
  name: 'GmapsAutocomplete',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      autocomplete: undefined,
      query: this.value,
      isResultSelected: false,
    }
  },
  async mounted() {
    try {
      const google = await gmapsInit()
      const input = document.getElementById('autocomplete')
      var options = {
        types: ['(cities)'],
        language: 'en',
      }
      this.autocomplete = new google.maps.places.Autocomplete(input, options)
      this.autocomplete.addListener('place_changed', this.getCity)
    } catch (error) {
      console.error(error)
    }
  },
  beforeDestroy() {
    this.autocomplete.removeEventListener('place_changed', this.getCity)
  },
  methods: {
    getCity() {
      const { name, formatted_address } = this.autocomplete.getPlace()
      // replaces user input with formatted result
      this.query = formatted_address
      this.isResultSelected = true
      // sends simple city name back to form
      this.$emit('input', name)
    },
    checkInput() {
      // runs onBlur, wipes the inserted value in case the users
      // do not select and "official" option from the drop-down
      if (!this.isResultSelected) this.query = ''
    },
    resetSelection() {
      // runs in case the user changes the current query
      this.isResultSelected = false
    },
  },
}
</script>

<style lang="scss">
// styling the google autocomplete drop-down menu
.pac-container {
  font-size: $font-size-p;
  font-family: $font-family;
  margin-top: $padding-sm;

  @extend .border-thin;
  @include shadow-color($dark);
}
.pac-item {
  border-top: none;
  padding: $padding-sm $padding;
}
</style>
