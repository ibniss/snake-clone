<template>
  <p>{{ fps.toFixed(0) }} FPS</p>
  <div id="canvasParent" class="relative"></div>
</template>
<script lang="ts" setup>
import { Game } from '/@services/game'
import { onMounted, ref } from 'vue'

const game = ref<Game>(new Game(true))
export const fps = ref<number>(0)
game.value.setOnFpsUpdate((num: number) => (fps.value = num))
onMounted(() => game.value.start())
</script>
<style>
canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
