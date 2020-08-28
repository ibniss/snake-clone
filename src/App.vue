<template>
  <article class="p-5">
    <h1 class="text-green-800 text-3xl font-bold">Hello Vite + Vue 3!</h1>
    <p>Edit ./App.vue to test hot module replacement (HMR).</p>
    <p class="mt-2">
      <span class="block">Count is: {{ count }}</span>
      <button
        class="px-4 py-2 bg-indigo-300 text-gray-800 border-gray-900 border rounded-lg"
        type="submit"
        @click="count++"
      >
        increment
      </button>
    </p>
  </article>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

export const count = ref(0)
</script>
