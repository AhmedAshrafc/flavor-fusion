<script setup lang="ts">
defineProps<{
  recipes: Array<any>;
}>();

import { useSearchResultsStore } from "~/stores/searchResultsStore";

const router = useRouter();
const searchResultsStore = useSearchResultsStore();
const recipes = computed(() => searchResultsStore.results);
</script>

<template>
  <section>
    <div
      class="p-10 md:p-20 border-b border-main-text grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="recipe in recipes"
        :key="recipe.id"
        class="border border-main-text rounded-lg flex flex-col items-center gap-6 p-6 mt-10"
      >
        <h3 class="font-black uppercase text-2xl md:text-3xl text-center">
          {{ recipe.name }}
        </h3>

        <img
          :src="recipe.image"
          :alt="recipe.name"
          class="w-32 md:w-40 lg:w-48 object-cover rounded-full"
        />
        <p class="text-center text-lg md:text-xl lg:text-2xl">
          {{ recipe.description || "No description available" }}
        </p>
        <NuxtLink
          @click="() => router.push(`/recipes/${recipe.id}`)"
          class="text-main-text underline cursor-pointer"
          >View Recipe</NuxtLink
        >
      </div>
    </div>
  </section>
</template>
