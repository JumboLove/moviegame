<template>
  <section>
    <router-link to="/">&lt; Reset</router-link>
    Game wrapper

  </section>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Game',
  data () {
    return {

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
        'primary_release_date.gte': '1990',
        'primary_release_date.lte': '2010'
      }
    })
    .then(resp => {
      next(vm => Object.assign(vm.$data, {movieData: resp.data}))
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>

</style>
