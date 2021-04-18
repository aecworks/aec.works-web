<template>
  <div>
    <div ref="poopee" class="poopee-container" :class="{ hide: hide }" @click="handleClick">
      <img src="@/assets/images/poopee.svg" />
    </div>
    <p class="delete-me hidden-sm">
      <a href="#" @click="handleDelete">delete</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Poopee',
  data() {
    return {
      hide: true,
    }
  },
  mounted() {
    let fiveMin = 1000 * 60 * 5
    const infiteLoop = () => {
      let sleep = fiveMin + Math.random() * fiveMin
      let right = Math.random() * window.innerWidth
      this.$refs.poopee.style.right = `${right}px`

      this.hide = false
      setTimeout(() => {
        this.hide = true
        setTimeout(infiteLoop, sleep)
      }, 750)
    }
    setTimeout(() => infiteLoop(), fiveMin)
  },
  methods: {
    handleDelete() {
      document.location.href = 'https://www.youtube.com/watch?v=oHg5SJYRHA0&ab_channel=cotter548'
      this.$ga.event({
        eventCategory: 'jokes',
        eventAction: 'rickrolled',
      })
    },
    handleClick() {
      this.hide = true
      new Audio(require('@/assets/sounds/thunk.mp3')).play()
      this.$ga.event({
        eventCategory: 'jokes',
        eventAction: 'beaver-clicked',
      })
    },
  },
}
</script>

<style lang="scss">
.delete-me {
  position: fixed;
  display: block;
  right: 10px;
  bottom: 0px;
  font-size: 10px;
  a {
    color: #bbb9b4;
    text-decoration: none;
  }
}
.poopee-container {
  cursor: crosshair;
  position: fixed;
  display: block;
  right: 0;
  bottom: 0;
  transition: transform 200ms ease-out;
  &.hide {
    transform: translateY(140px);
  }
  img {
    height: 120px;
  }
}
</style>
