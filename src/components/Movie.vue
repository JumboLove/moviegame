<template>
  <div>
    <div>
      {{this.info.tagline}}
    </div>

    <div>
      {{genre}}
    </div>

    <div>
      {{this.info.release_date}}
    </div>

    <div>
      {{starring}}
    </div>

    <div>
      {{this.info.overview}}
    </div>

    <div>
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

    }
  },
  created () {
    EventBus.$on('show-hint-1', () => { this.showTagline() })
    EventBus.$on('show-hint-2', () => { this.showGenre() })
    // @TODO finish
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
    showTagline () {
      console.log('show tagline')
    },
    showGenre () {
      console.log('show genre')
    }
  }
}
</script>

<style scoped>

</style>
