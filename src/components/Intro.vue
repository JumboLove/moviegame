<template>
  <section class="container">
    <div class="content has-text-centered">
      <h1>Rules</h1>
      <p>Try to type in the name of the movie as hints are revealed</p>
      <p>Each movie is worth 1000 points at the start of the round</p>
      <p>As time goes by and clues are revealed, a correct answer is worth fewer points</p>
      <p>There is no penalty for guessing incorrectly</p>
    </div>

    <div class="config">
      <div class="slider-wrapper">
        <h2 class="is-size-4 has-text-centered">Movies released between years</h2>
        <vue-slider v-model="slider.value" v-bind="slider.options"></vue-slider>
      </div>

      <div class="start-wrapper">
        <router-link :to="{ name: 'Game', params: { start: this.slider.value[0], end: this.slider.value[1]}}" class="button is-primary is-large">Start</router-link>
      </div>
    </div>
  </section>

</template>

<script>
import vueSlider from 'vue-slider-component'

export default {
  name: 'Intro',
  components: {
    vueSlider
  },
  data () {
    return {
      slider: {
        value: [
          1990,
          2017
        ],
        options: {
          min: 1970,
          max: 2017,
          width: 'auto'
        }
      }
    }
  }
}
</script>

<style scoped>
.start-wrapper {
  margin: 2rem auto;
  text-align: center;
}

.slider-wrapper {
  margin: 2rem auto;
}

.slider-wrapper h2 {
  margin-bottom: 3rem;
}
</style>
