<template>
  <div>
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

    <div v-if="showOverview">
      {{this.info.overview}}
    </div>

    <div v-if="showTitle">
      {{this.info.title}}
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
  },
  destroyed () {
    EventBus.$off('show-hint-1')
    EventBus.$off('show-hint-2')
    EventBus.$off('show-hint-3')
    EventBus.$off('show-hint-4')
    EventBus.$off('show-hint-5')
    EventBus.$off('show-hint-6')
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
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
