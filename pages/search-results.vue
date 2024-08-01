<script setup lang="ts">
import { useRoute } from "vue-router";

defineProps<{
  recipes: Array<any>;
}>();

import { useSearchResultsStore } from "~/stores/searchResultsStore";

const router = useRouter();
const route = useRoute();
const searchResultsStore = useSearchResultsStore();
const recipes = computed(() => searchResultsStore.results);

const searchTerm = computed(() => route.query.term || "");

useHead({
  title: `FlavorFusion | Search Results For ${searchTerm.value}`,
  meta: [
    {
      name: "description",
      content:
        "Explore FlavorFusion, where we bring the best flavors to your table. Discover recipes, tips, and more!",
    },
  ],
});

useSeoMeta({
  title: `FlavorFusion | Search Results For ${searchTerm.value}`,
  ogTitle: `FlavorFusion | Search Results For ${searchTerm.value}`,
  description:
    "Discover FlavorFusion, your ultimate destination for delicious recipes and flavor inspiration. Dive into a world of culinary delights.",
  ogDescription:
    "FlavorFusion offers a variety of recipes, cooking tips, and flavor inspirations to elevate your culinary experience.",
});
</script>

<template>
  <section>
    <div v-if="recipes.length === 0" class="p-10 md:p-20 text-center">
      <p class="text-xl md:text-2xl lg:text-3xl text-main-text">
        Sorry! No recipe found with this search term.
      </p>
    </div>
    <div
      v-else
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
