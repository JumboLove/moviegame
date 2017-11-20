<template>
  <section class="container">
    <!-- Movie section as 8 wide -->
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-parent is-8">
        <div class="tile is-child box">

          Movie
          {{currentMovie}}
          {{currentMovie.title}}
        </div>
      </div>

      <!-- Sidebar with score, input, and history as 4 wide -->
      <div class="tile is-vertical is-parent is-4">
        <div class="tile is-child box notification is-success">
          <span class="title">{{this.score}}</span>
          <span class="title">points</span>
          <span class="sub-title is-block">Movie {{this.currentQuestion}}/10</span>
        </div>
        <div class="tile is-child box">
          <Timer></Timer>
          <hr />
          <b-field label="Movie Title" class="is-size-4">
            <b-input v-model="currentGuess"></b-input>
          </b-field>
        </div>
        <div class="tile is-child box">
          History test
          <router-link to="/" class="is-block">&lt; Reset</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { shuffle, debounce } from 'lodash'
import { EventBus } from '@/event-bus.js'

import Timer from '@/components/Timer'

export default {
  name: 'Game',
  components: {Timer},
  data () {
    return {
      movieData: null,
      movieList: [],
      score: 0,
      currentQuestion: 1,
      currentGuess: '',
      currentMovieIndex: 0,
      currentMovie: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    /**
     * Get popular movies between year range
     * Each page returns 20 results, get a random page 1-10
     * Only include English movies, exclude adult genre
     */
    axios.get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        api_key: 'c4ad04648c8511d24d60ef4965cb2e52',
        page: Math.floor(Math.random() * 10) + 1,
        sort_by: 'popularity.desc',
        with_original_language: 'en',
        include_adult: false,
        'primary_release_date.gte': to.params.start,
        'primary_release_date.lte': to.params.end
      }
    })
    .then(resp => {
      next(vm => Object.assign(vm.$data, {movieData: resp.data}))
    })
    .catch(err => {
      // @TODO create error page
      console.log(err)
    })
  },
  watch: {
    /**
     * Begin game once movieData is updated
     * 'movieData' should be updated inside the componet
     * Use 'movieList' for game related data manipulation
     */
    movieData: function () {
      this.beginGame()
    },
    currentGuess: function () {
      this.handleGuess()
    }
  },
  methods: {
    beginGame () {
      this.movieList = shuffle(this.movieData.results)
      this.getMovie()
      EventBus.$emit('start-timer')
    },
    getMovie () {
      this.currentMovie = this.movieList[this.currentMovieIndex]
      this.currentMovieIndex++
    },
    handleGuess: debounce(function () {
      if (this.currentGuess.toLowerCase() === this.currentMovie.title.toLowerCase()) {
        this.handleCorrectGuess()
      }
    }, 200),
    handleCorrectGuess () {
      console.log('correct guess')
      // update score
      // push correct guess to history panel
      // get new movie
      // reset timer
    }
  }
}
</script>

<style scoped>

</style>
