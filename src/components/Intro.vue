<template>
  <section>
    <h1>Rules</h1>
    <p>Try to type in the name of the movie as hints are revealed</p>
    <p>Each round is worth 1000 points at the start of the round</p>
    <p>As time goes by and clues are revealed, a correct answer is worth fewer points</p>
    <p>There is no penalty for guessing incorrectly</p>

    <div class="config">
      Slider to determine range of movie release years TODO

      <div class="start-wrapper">
        <router-link :to="{ name: 'Game', params: { start: this.start, end: this.end}}">Test</router-link>
      </div>
    </div>
  </section>

</template>

<script>
export default {
  name: 'Intro',
  data () {
    return {
      start: '1990',
      end: '2011'
    }
  }
}
</script>

<style scoped>
.start-wrapper {
  margin: 2rem auto;
  text-align: center;
}
</style>
