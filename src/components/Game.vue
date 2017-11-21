<template>
  <section class="container">
    <!-- Movie section as 8 wide -->
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-parent is-8">
        <div class="tile is-child box">
          <Movie :info="currentMovie"></Movie>
        </div>
      </div>

      <!-- Sidebar with score, input, and history as 4 wide -->
      <div class="tile is-vertical is-parent is-4">

        <!-- Score -->
        <div class="tile is-child box notification is-success">
          <span class="title">{{this.score}}</span>
          <span class="title">points</span>
          <span class="sub-title is-block">Movie {{this.currentQuestion}}/{{this.totalQuestions}}</span>
        </div>

        <!-- Answer box -->
        <div class="tile is-child box answer-section">
          <Timer></Timer>
          <hr />
          <b-field label="Movie Title" class="is-size-4">
            <b-input v-model="currentGuess"></b-input>
          </b-field>
          <span class="subtitle has-text-success is-6"v-if="solved">You got it! Next one coming up...</span>
        </div>

        <!-- History -->
        <div class="tile is-child box">
            <div class="history-header">
              <span class="subtitle is-marginless">History</span>
              <router-link to="/" class="button is-primary">Reset</router-link>
            </div>
          <ul>
            <li class="round-result" v-for="round in roundHistory" :key="round.round">
              <div class="notification" v-bind:class="[round.success ? 'is-success': 'is-danger']">
                <span class="is-size-4">{{round.round}}</span>
                <span>{{round.name}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import FuzzyMatching from 'fuzzy-matching'
import { shuffle, debounce, delay } from 'lodash'
import { EventBus } from '@/event-bus.js'

import Timer from '@/components/Timer'
import Movie from '@/components/Movie'

export default {
  name: 'Game',
  components: {Timer, Movie},
  data () {
    return {
      movieData: null,
      movieList: [],
      score: 0,
      currentQuestion: 0,
      totalQuestions: 10,
      currentGuess: '',
      currentMovieIndex: 0,
      currentMovie: {},
      currentMovieFuzzyMatch: null,
      solved: false,
      roundHistory: []
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
        page: Math.floor(Math.random() * 30) + 1,
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
  created () {
    EventBus.$on('report-score', (score) => { this.addToScore(score) })
    EventBus.$on('round-time-expired', () => { this.handleTimeRanOut() })
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
      this.currentQuestion = 0
      this.movieList = shuffle(this.movieData.results)
      this.nextRound()
    },
    getMovie () {
      // Get extra details with another API call
      return axios.get(`https://api.themoviedb.org/3/movie/${this.movieList[this.currentMovieIndex].id}`, {
        params: {
          api_key: 'c4ad04648c8511d24d60ef4965cb2e52',
          append_to_response: 'credits'
        }
      })
    },
    handleGuess: debounce(function () {
      if (!this.solved && this.fuzzyMatching.get(this.currentGuess).distance >= 0.8) {
        this.solved = true
        this.handleCorrectGuess()
      }
    }, 200),
    handleCorrectGuess () {
      // stopping the timer will trigger a score event
      // where the Timer will report the score back to this component
      EventBus.$emit('stop-timer')

      // add successful round to history panel
      this.roundHistory.unshift({
        round: this.currentQuestion,
        name: this.currentMovie.title,
        success: true
      })

      delay(this.nextRound, 3000)
    },
    handleTimeRanOut () {
      EventBus.$emit('stop-timer')

      // add failed round to history panel
      this.roundHistory.unshift({
        round: this.currentQuestion,
        name: this.currentMovie.title,
        success: false
      })

      delay(this.nextRound, 3000)
    },
    nextRound () {
      if (this.currentQuestion === this.totalQuestions) {
        this.finishGame()
      } else {
        this.currentQuestion++
        this.currentGuess = ''
        this.solved = false
        this.getMovie()
          .then(resp => {
            this.currentMovie = resp.data
            this.currentMovieIndex++
            this.fuzzyMatching = new FuzzyMatching([this.currentMovie.title])
            EventBus.$emit('reset-movie')
            EventBus.$emit('reset-timer')
            delay(() => { EventBus.$emit('start-timer') }, 1000)
          })
          .catch(err => {
            // @TODO create error page
            console.log(err)
          })
      }
    },
    finishGame () {
      console.log('finish game')
    },
    addToScore (score) {
      this.score += score
    }
  }
}
</script>

<style scoped>
  .answer-section {
    min-height: 205px;
  }

  .history-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .round-result .notification {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  .round-result + .round-result {
    margin-top: 1rem;
  }

  .round-result span:first-child {
    margin-right: 1rem;
  }
</style>
