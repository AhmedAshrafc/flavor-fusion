<script setup lang="ts">
import axios from "axios";

useHead({
  title: "FlavorFusion | Recipes",
  meta: [
    {
      name: "description",
      content:
        "Explore FlavorFusion, where we bring the best flavors to your table. Discover recipes, tips, and more!",
    },
  ],
});

useSeoMeta({
  title: "FlavorFusion | Recipes",
  ogTitle: "FlavorFusion | Recipes",
  description:
    "Discover FlavorFusion, your ultimate destination for delicious recipes and flavor inspiration. Dive into a world of culinary delights.",
  ogDescription:
    "FlavorFusion offers a variety of recipes, cooking tips, and flavor inspirations to elevate your culinary experience.",
});

interface Recipe {
  id: number;
  name: string;
  description: string;
  image: string;
}

const recipes = ref<Recipe[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);
const router = useRouter();

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://app.interimapi.com/api/v1/8aecf488-4e4d-487e-aa1b-7a3f6abacdfc/recipes`
    );
    recipes.value = response.data;
    isLoading.value = false;
  } catch (err) {
    error.value = "Error fetching recipes";
    isLoading.value = false;
    console.error(err);
  }
});
</script>

<template>
  <section
    class="p-10 md:p-20 border-b border-main-text"
    :style="{ borderColor: 'var(--border-color)' }"
  >
    <h2
      class="font-black text-center uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[7rem] leading-tight"
    >
      All 100% Egyptian Recipes
    </h2>
    <p class="font-bold text-center">
      Here are some of the most popular Egyptian recipes that you can try at
      home.
    </p>

    <div v-if="error" class="text-center text-red-600">
      <p>{{ error }}</p>
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
    >
      <template v-if="isLoading">
        <div
          v-for="n in 6"
          :key="n"
          class="border border-main-text rounded-lg flex flex-col items-center gap-6 p-6"
        >
          <div class="flex flex-row gap-2">
            <div class="animate-pulse bg-gray-300 w-32 h-32 rounded-full"></div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="animate-pulse bg-gray-300 w-40 h-6 rounded-full"></div>
            <div class="animate-pulse bg-gray-300 w-56 h-6 rounded-full"></div>
          </div>
        </div>
      </template>

      <template v-else>
        <div
          v-for="recipe in recipes"
          :key="recipe.id"
          class="border border-main-text rounded-lg flex flex-col items-center gap-6 p-6 mt-10"
          :style="{ borderColor: 'var(--border-color)' }"
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
            class="underline cursor-pointer"
            >View Recipe</NuxtLink
          >
        </div>
      </template>
    </div>
  </section>
</template>
