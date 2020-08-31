<template>
  <div class="container mx-auto">
    <div class="px-6 py-6 bg-gray-50">
      <h1 class="text-gray-800 text-3xl font-bold">Snake Clone</h1>
    </div>
    <div class="px-6">
      <Game />
    </div>
  </div>
</template>
<script lang="ts">
import Game from '/@components/Game.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { Game },
})
</script>
