<template>
  <div>
    Movie {{this.info.title}}

    <div>
      {{this.info.tagline}}
    </div>

    <div>
      {{this.info.release_date}}
    </div>

    <div>
      {{starring}}
    </div>

    <div>
      {{genre}}
    </div>

    <div>
      {{this.info.overview}}
    </div>

    <div>
      {{this.info.title}}
    </div>
  </div>
  </div>

</template>

<script>
export default {
  name: 'Movie',
  props: ['info'],
  data () {
    return {

    }
  },
  computed: {
    starring: function () {
      return 'starring'
    },
    genre: function () {
      return 'genre...'
    }
  }
}
</script>

<style scoped>

</style>
