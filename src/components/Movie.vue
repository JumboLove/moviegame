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

export default {
  name: 'Movie',
  props: ['info'],
  data () {
    return {

    }
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
  }
}
</script>

<style scoped>

</style>
