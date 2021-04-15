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
import { gmapsInit, getCountryComponent } from '../libs/gmaps'

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
      google: undefined,
      autocomplete: undefined,
      autocompleteListener: undefined,
      query: this.value,
      isResultSelected: false,
    }
  },
  watch: {
    value(newVal) {
      // Update Query when set from prop - this allow input to be mounted and proped to be set later
      this.query = newVal
    },
  },
  async mounted() {
    try {
      this.google = await gmapsInit()
      const input = document.getElementById('autocomplete')
      var options = {
        types: ['(cities)'],
        language: 'en',
      }
      this.autocomplete = new this.google.maps.places.Autocomplete(input, options)
      this.autocompleteListener = this.autocomplete.addListener('place_changed', this.getCity)
    } catch (error) {
      console.error(error)
    }
  },
  beforeDestroy() {
    this.google.maps.event.removeListener(this.autocompleteListener)
  },
  methods: {
    getCity() {
      try {
        const { name: city, formatted_address, address_components } = this.autocomplete.getPlace()
        const countryComponent = getCountryComponent(address_components)
        this.isResultSelected = true
        this.query = formatted_address
        this.$emit('input', `${city}, ${countryComponent.long_name}`)
      } catch (e) {
        console.error(e)
      }
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
