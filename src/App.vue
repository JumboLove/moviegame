<template>
  <div id="app" class="section">
    <h1 class="title has-text-centered">Guess that Movie</h1>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.use(Buefy)

export default {
  name: 'app'
}
</script>

<style>

</style>
