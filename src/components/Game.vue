<template>
  <p>{{ fps.toFixed(0) }} FPS</p>
  <p>Game status: {{ status }}</p>
  <button
    class="px-6 py-2 bg-green-500 text-white rounded-md"
    @click="game.start()"
  >
    Start
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
onMounted(() => {
  game.value.setOnFpsUpdate((num: number) => (fps.value = num))
  game.value.setOnStatusUpdate((s: GameStatus) => (status.value = s))
  game.value.prepare()
})
</script>
<style>
canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
