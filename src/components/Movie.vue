<template>
  <div class="movie-wrapper">
    <div class="movie-backdrop">
      <img :src="backdropImg" :alt="this.info.title"/>
    </div>

    <div class="movie-overlay">
      <div class="movie-overlay-content">

        <div class="movie-overlay-upper">
          <figure class="movie-poster">
            <img :src="posterImg" :alt="this.info.title"/>
          </figure>

          <div class="movie-info">
            <div v-if="showTitle">
              {{this.info.title}}
            </div>
            <div>
              {{this.info.tagline}}
            </div>

            <div v-if="showGenre">
              {{genre}}
            </div>

            <div v-if="showRelease">
              {{this.info.release_date}}
            </div>

            <div v-if="showStarring">
              {{starring}}
            </div>
          </div>
        </div>

        <div class="movie-summary">
          <div v-if="showOverview">
            {{this.info.overview}}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { take } from 'lodash'
import { EventBus } from '@/event-bus.js'

export default {
  name: 'Movie',
  props: ['info'],
  data () {
    return {
      showTagline: false,
      showGenre: false,
      showRelease: false,
      showStarring: false,
      showOverview: false,
      showTitle: false
    }
  },
  created () {
    EventBus.$on('show-hint-1', () => { this.showTagline = true })
    EventBus.$on('show-hint-2', () => { this.showGenre = true })
    EventBus.$on('show-hint-3', () => { this.showRelease = true })
    EventBus.$on('show-hint-4', () => { this.showStarring = true })
    EventBus.$on('show-hint-5', () => { this.showOverview = true })
    EventBus.$on('show-hint-6', () => { this.showTitle = true })
    EventBus.$on('reset-movie', () => { this.resetMovie() })
  },
  destroyed () {
    EventBus.$off('show-hint-1')
    EventBus.$off('show-hint-2')
    EventBus.$off('show-hint-3')
    EventBus.$off('show-hint-4')
    EventBus.$off('show-hint-5')
    EventBus.$off('show-hint-6')
    EventBus.$off('reset-movie')
  },
  computed: {
    starring: function () {
      if (!this.info || !this.info.credits) { return '' }

      let castList = []
      take(this.info.credits.cast, 5).map((castMember) => { castList.push(castMember.name) })
      return castList.join(', ')
    },
    genre: function () {
      if (!this.info || !this.info.genres) { return '' }

      let genreList = []
      take(this.info.genres, 3).map((genre) => { genreList.push(genre.name) })
      return genreList.join(', ')
    },
    backdropImg: function () {
      return `https://image.tmdb.org/t/p/w780/${this.info.backdrop_path}`
    },
    posterImg: function () {
      return `https://image.tmdb.org/t/p/w342/${this.info.poster_path}`
    }
  },
  methods: {
    resetMovie () {
      this.showTagline = false
      this.showGenre = false
      this.showRelease = false
      this.showStarring = false
      this.showOverview = false
      this.showTitle = false
    }
  }
}
</script>

<style scoped>
  .movie-wrapper {
    position: relative;
  }

  .movie-backdrop img {
    width: 100%;
    filter: opacity(100) grayscale(100%) contrast(130%);
    z-index: 1;
  }

  .movie-backdrop:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(45deg,#a177ff,#02ceff);
    opacity: .7;
    z-index: 2;
  }

  .movie-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
  }

  .movie-overlay-upper {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    color: #fff;
  }

  .movie-poster {
    flex: 1;
  }

  .movie-info {
    flex: 2;
  }

  .movie-summary {
    color: #fff;
  }
</style>
