<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="bg-main-bg h-[100vh] flex flex-col items-center justify-center">
    <h2 class="font-black uppercase text-[7rem]">
      Oops! {{ error?.statusCode }}
    </h2>
    <button
      @click="handleError"
      class="text-[2rem] bg-main-text text-white py-4 px-20 hover:bg-secondary-dark transition-all duration-300 ease-in-out"
    >
      Go back Home
    </button>
    <!-- <BaseButton @click="handleError">Go Back Home</BaseButton> -->
  </div>
</template>
