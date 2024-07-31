<script setup lang="ts">
import axios from "axios";

interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

interface Review {
  id: number;
  recipe_id: number;
  user_name: string;
  user_id: number;
  review: string;
}

const recipe = ref<Recipe | null>(null);
const reviews = ref<Review[]>([]);
const newReview = ref<string>("");
const error = ref<string | null>(null);
const route = useRoute();

onMounted(async () => {
  const recipeId = route.params.id as string;
  try {
    const response = await axios.get(
      `https://app.interimapi.com/api/v1/8aecf488-4e4d-487e-aa1b-7a3f6abacdfc/recipes/${recipeId}`
    );
    recipe.value = response.data;

    const reviewsResponse = await axios.get(
      `https://app.interimapi.com/api/v1/8aecf488-4e4d-487e-aa1b-7a3f6abacdfc/reviews`
    );
    reviews.value = reviewsResponse.data.filter(
      (review: Review) => review.recipe_id === recipe.value!.id
    );

    useHead({
      title: `FlavorFusion | ${recipe?.value?.name}`,
      meta: [
        {
          name: "description",
          content: `Discover the recipe for ${recipe?.value?.name} on FlavorFusion. Explore ingredients, instructions, and more!`,
        },
        {
          property: "og:title",
          content: `FlavorFusion | ${recipe?.value?.name}`,
        },
        {
          property: "og:description",
          content: `Find out how to make ${recipe?.value?.name} with our detailed recipe. FlavorFusion provides all the details you need.`,
        },
        {
          property: "og:image",
          content: recipe?.value?.image,
        },
        {
          name: "twitter:title",
          content: `FlavorFusion | ${recipe?.value?.name}`,
        },
        {
          name: "twitter:description",
          content: `Learn how to prepare ${recipe?.value?.name}. Get all the ingredients and cooking instructions on FlavorFusion.`,
        },
        {
          name: "twitter:image",
          content: recipe?.value?.image,
        },
      ],
    });
  } catch (err) {
    error.value = "Error fetching recipe";
    console.error(err);
  }
});

import { useToast } from "primevue/usetoast";
const toast = useToast();

const addToFavorites = async () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser && recipe.value) {
    const user = JSON.parse(storedUser);
    try {
      const response = await axios.post(
        `https://app.interimapi.com/api/v1/8aecf488-4e4d-487e-aa1b-7a3f6abacdfc/favorites`,
        {
          recipe_name: recipe.value.name,
          recipe_url: `/recipes/${recipe.value.id}`,
          user_id: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.add({
          severity: "success",
          summary: "Added to Favorites",
          detail: "Recipe added to favorites successfully",
          life: 5000,
        });
      } else {
        toast.add({
          severity: "error",
          summary: "Failed to add to Favorites",
          detail: "Please try again",
          life: 5000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.add({
        severity: "error",
        summary: "Failed to add to Favorites",
        detail: "Please try again",
        life: 5000,
      });
    }
  } else {
    toast.add({
      severity: "error",
      summary: "Login required",
      detail: "You need to be logged in to add favorites",
      life: 5000,
    });
  }
};

const submitReview = async () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser && recipe.value) {
    const user = JSON.parse(storedUser);
    try {
      const response = await axios.post(
        `https://app.interimapi.com/api/v1/8aecf488-4e4d-487e-aa1b-7a3f6abacdfc/reviews`,
        {
          recipe_id: recipe.value.id,
          user_name: user.name,
          user_id: user.id,
          review: newReview.value,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        reviews.value.push({
          id: response.data.id,
          recipe_id: recipe.value.id,
          user_name: user.name,
          user_id: user.id,
          review: newReview.value,
        });
        newReview.value = "";
        toast.add({
          severity: "success",
          summary: "Review submitted",
          detail: "Your review has been submitted successfully",
          life: 5000,
        });
      } else {
        toast.add({
          severity: "error",
          summary: "Failed to submit review",
          detail: "Please try again",
          life: 5000,
        });
      }
    } catch (err) {
      toast.add({
        severity: "error",
        summary: "Failed to submit review",
        detail: "Please try again",
        life: 5000,
      });
    }
  } else {
    toast.add({
      severity: "error",
      summary: "Login required",
      detail: "You need to be logged in to submit a review",
      life: 5000,
    });
  }
};
</script>

<template>
  <section class="p-10 md:p-20 border-b border-main-text">
    <h2
      v-if="recipe"
      class="font-black text-center uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[7rem] leading-tight"
    >
      {{ recipe.name }}
    </h2>
    <div v-if="error" class="text-center text-red-600">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="recipe" class="flex flex-col items-center">
      <button
        class="uppercase font-bold text-md ml-auto mt-10 bg-main-text text-white p-4 hover:bg-secondary-dark transition-all duration-300 ease-in-out"
        @click="addToFavorites"
      >
        Add to Favorites
        <i class="pi pi-arrow-right ml-2"></i>
      </button>
      <div class="flex flex-col lg:flex-row gap-10 md:gap-20 mt-10">
        <img
          :src="recipe.image"
          :alt="recipe.name"
          class="w-full mx-auto lg:mx-0 md:w-3/4 lg:w-[30%] lg:h-[30%] object-cover rounded-full"
        />
        <div>
          <p class="text-lg mt-4 italic">
            <strong>Description: </strong>{{ recipe.description }}
          </p>
          <p class="text-lg mt-4 italic">
            <strong>Ingredients: </strong>{{ recipe.ingredients }}
          </p>
          <span class="uppercase font-bold text-2xl mt-4 inline-block"
            >How to cook: (follow these instructions very well for a delicious
            meal)</span
          >
          <div class="flex flex-col md:flex-row justify-between">
            <p class="text-lg mt-4 italic flex flex-col">
              <strong>Instructions:</strong> {{ recipe.instructions }}
            </p>
            <img
              src="/images/hand-drawn-oven.png"
              alt="Hand Drawn Oven"
              class="w-64"
            />
          </div>
          <p class="text-lg italic mt-4">
            <strong>Prep Time:</strong> {{ recipe.prepTimeMinutes }} minutes
          </p>
          <p class="text-lg mt-4 italic">
            <strong>Cook Time:</strong> {{ recipe.cookTimeMinutes }} minutes
          </p>
          <p class="text-lg mt-4 italic">
            <strong>Servings:</strong> {{ recipe.servings }}
          </p>
          <p class="text-lg mt-4 italic">
            <strong>Difficulty Rank:</strong> {{ recipe.difficulty }}
          </p>
          <p class="text-lg mt-4 italic">
            <strong>Cuisine:</strong> {{ recipe.cuisine }}
          </p>
          <p class="text-lg mt-4 italic">
            <strong>Calories Per Serving:</strong>
            {{ recipe.caloriesPerServing }}
          </p>
          <p class="text-lg mt-4 italic">
            <strong>Rating (how delicious it is):</strong> {{ recipe.rating }}
          </p>
        </div>
      </div>
    </div>

    <div class="mt-20">
      <h2
        class="font-black uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[3rem] leading-tight"
      >
        Reviews
      </h2>
      <form @submit.prevent="submitReview" class="mt-5">
        <textarea
          v-model="newReview"
          placeholder="Write your review here..."
          class="w-full h-[200px] border resize-none border-main-text text-white p-4 outline-none"
        ></textarea>
        <button
          type="submit"
          class="mt-2 bg-main-text hover:bg-secondary-dark text-white text-lg py-2 px-4 transition-all duration-300 ease-in-out"
        >
          Submit Review
        </button>
      </form>
      <div class="mt-10 space-y-4">
        <div
          v-for="review in reviews"
          :key="review.id"
          class="border border-main-text p-4 rounded-md"
        >
          <h3 class="font-bold">{{ review.user_name }}</h3>
          <p>{{ review.review }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* .review-card {
  border: 1px solid #333;
  padding: 1rem;
  border-radius: 8px;
} */
</style>
