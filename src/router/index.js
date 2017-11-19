import Vue from 'vue'
import Router from 'vue-router'
import Intro from '@/components/Intro'
import Game from '@/components/Game'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Intro',
      component: Intro
    },
    {
      path: '/game?start=:start&end:end',
      name: 'Game',
      component: Game,
      props: {Game: true}
    }
  ]
})
