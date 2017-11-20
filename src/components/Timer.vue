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
      timeStart: 13000,
      timeLeft: 13000,
      maxPoints: 1000,
      tick: 20,
      timerObj: null
    }
  },
  computed: {
    timeToPoints: function () {
      return Math.floor((this.maxPoints / this.timeStart) * this.timeLeft)
    },
    timeToPercent: function () {
      return Math.floor(this.timeLeft / this.timeStart * 100)
    }
  },
  created () {
    EventBus.$on('start-timer', () => { this.startTimer() })
    EventBus.$on('stop-timer', () => { this.stopTimer() })
  },
  destroyed () {
    EventBus.$off('start-timer')
    EventBus.$off('stop-timer')
  },
  watch: {
    timeLeft: function () {
      switch (this.timeLeft) {
        case this.timeStart:
          EventBus.$emit('show-hint-1')
          break
        case 11000:
          EventBus.$emit('show-hint-2')
          break
        case 8000:
          EventBus.$emit('show-hint-3')
          break
        case 6000:
          EventBus.$emit('show-hint-4')
          break
        case 4000:
          EventBus.$emit('show-hint-5')
          break
        case 0:
          EventBus.$emit('show-hint-6')
          break
        default:
          // Do nothing
          break
      }
    }
  },
  methods: {
    startTimer () {
      this.timerObj = window.setInterval(this.tickDown, this.tick)
    },
    stopTimer () {
      window.clearInterval(this.timerObj)
      EventBus.$emit('report-score', this.timeToPoints)
    },
    tickDown () {
      if (this.timeLeft > 0) {
        this.timeLeft = this.timeLeft - this.tick
      }
    }
  }
}
</script>

<style scoped>
  progress::-webkit-progress-value {
    transition: width 0.2s linear
  }
</style>
