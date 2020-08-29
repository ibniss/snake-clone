<template>
  <div>
    <div id="canvasParent"></div>
  </div>
</template>
<script lang="ts" setup>
import { Game } from '/@services/game'
import { onMounted, ref } from 'vue'

const game = ref(new Game())
onMounted(() => game.value.awake())
</script>
