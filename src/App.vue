<template>
  <div class="px-6 py-3 bg-gray-50">
    <h1 class="text-gray-800 text-3xl font-bold">Snake Clone</h1>
  </div>
  <div class="px-6 py-3">
    <Game />
  </div>
</template>
<script lang="ts">
import Game from '/@components/Game.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { Game },
})
</script>
