<script setup lang="ts">
import axios from "axios";

interface Recipe {
  id: number;
  name: string;
  description: string;
  image: string;
}

const recipes = ref<Recipe[]>([]);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://app.interimapi.com/api/v1/8aecf488-4e4d-487e-aa1b-7a3f6abacdfc/recipes`
    );
    recipes.value = response.data;
  } catch (err) {
    error.value = "Error fetching recipes";
    console.error(err);
  }
});

const responsiveOptions = [
  {
    breakpoint: "1024px",
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: "600px",
    numVisible: 1,
    numScroll: 1,
  },
];
</script>

<template>
  <section class="py-10 md:px-8 lg:px-16 border-b border-main-text">
    <div class="border-b border-main-text mb-10">
      <h2
        class="font-black text-center uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[7rem] leading-tight"
      >
        Top Featured Menu Recipes
      </h2>
    </div>

    <div v-if="error" class="text-center text-red-600">
      <p>{{ error }}</p>
    </div>

    <div v-else>
      <Carousel
        :value="recipes"
        :numVisible="3"
        :numScroll="3"
        :responsiveOptions="responsiveOptions"
      >
        <template #item="slotProps">
          <div
            class="border border-main-text rounded-lg flex flex-col items-center gap-6 p-6 mr-10"
          >
            <h3
              class="font-black uppercase text-2xl md:text-3xl lg:text-[3rem]"
            >
              {{ slotProps.data.name }}
            </h3>
            <img
              :src="slotProps.data.image"
              :alt="slotProps.data.name"
              class="w-32 md:w-40 lg:w-48 object-cover rounded-full"
            />
            <p class="text-center text-lg md:text-xl lg:text-2xl">
              {{ slotProps.data.description || "No description available" }}
            </p>
          </div>
        </template>
      </Carousel>
      <div class="flex justify-end w-full mt-10">
        <NuxtLink to="/recipes">
          <button
            class="uppercase underline decoration-wavy py-4 px-2 md:px-10 bg-main-text text-white flex gap-4 hover:scale-105 transition-transform"
          >
            let's see the recipes <i class="pi pi-arrow-up-right"></i>
          </button>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
