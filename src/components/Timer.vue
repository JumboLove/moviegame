<template>
  <section>
    <progress class="progress is-primary is-small" :value="timeToPercent" max="100">{{timeToPercent}}</progress>
  </section>

</template>

<script>
import { EventBus } from '@/event-bus.js'

export default {
  name: 'Timer',
  data () {
    return {
      timeStart: 10000,
      timeLeft: 10000,
      timerObj: null
    }
  },
  computed: {
    timeToPoints: function () {
      return Math.floor(this.timeLeft / 10)
    },
    timeToPercent: function () {
      return Math.floor(this.timeLeft / this.timeStart * 100)
    }
  },
  created () {
    EventBus.$on('start-timer', this.startTimer)
  },
  destroyed () {
    EventBus.$off('start-timer')
  },
  methods: {
    startTimer () {
      this.timerObj = window.setInterval(this.tickDown, 20)
    },
    stopTimer () {
      window.clearInterval(this.timerObj)
    },
    tickDown () {
      if (this.timeLeft > 0) {
        this.timeLeft = this.timeLeft - 20
      }
    }
  }
}
</script>

<style scoped>

</style>
