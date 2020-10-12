<template>
  <p>{{ fps.toFixed(0) }} FPS</p>
  <p>Game status: {{ status }}</p>
  <p>Score: {{ score }}</p>
  <button
    class="px-6 py-2 bg-green-500 focus:outline-none focus:shadow-outline text-white rounded-md"
    @click="start"
  >
    Start
  </button>
  <button
    class="px-6 py-2 bg-yellow-500 focus:outline-none focus:shadow-outline text-white rounded-md"
    @click="restart"
  >
    Restart
  </button>

  <div id="canvasParent" class="relative"></div>
</template>
<script lang="ts" setup>
import { Game } from '/@services/game'
import { onMounted, ref } from 'vue'
import { GameStatus } from '/@services/utils'

export const game = ref<Game>(new Game())
export const fps = ref<number>(0)
export const status = ref<GameStatus>('not running')
export const score = ref<number>(0)
onMounted(() => {
  game.value.setOnFpsUpdate((num: number) => (fps.value = num))
  game.value.setOnStatusUpdate((s: GameStatus) => (status.value = s))
  game.value.setOnScoreUpdate((n: number) => (score.value = n))
  game.value.prepare()
})

export const start = () => {
  game.value.start()
}

export const restart = () => {
  game.value.restart()
}
</script>
<style>
canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
