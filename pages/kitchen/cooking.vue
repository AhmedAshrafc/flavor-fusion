<script setup lang="ts">
import axios from "axios";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

definePageMeta({
  layout: "dashboard",
  title: "Home - FlavorFusion Kitchen",
});

useHead({
  title: "FlavorFusion | Kitchen Station (Cooking)",
  meta: [
    {
      name: "description",
      content:
        "Explore FlavorFusion, where we bring the best flavors to your table. Discover recipes, tips, and more!",
    },
  ],
});

useSeoMeta({
  title: "FlavorFusion | Kitchen Station (Cooking)",
  ogTitle: "FlavorFusion | Kitchen Station (Cooking)",
  description:
    "Discover FlavorFusion, your ultimate destination for delicious recipes and flavor inspiration. Dive into a world of culinary delights.",
  ogDescription:
    "FlavorFusion offers a variety of recipes, cooking tips, and flavor inspirations to elevate your culinary experience.",
});

const toast = useToast();
const router = useRouter();

const initialForm = {
  name: "",
  description: "",
  ingredients: "",
  instructions: "",
  image: "",
  prepTimeMinutes: 0,
  cookTimeMinutes: 0,
  servings: 0,
  difficulty: "",
  cuisine: "",
  caloriesPerServing: 0,
  tags: "",
  userId: 0,
  postedBy: "",
  reviewCount: 0,
  mealType: "",
  rating: 0,
};

const form = ref({ ...initialForm });

const getUserInfo = () => {
  const userString = localStorage.getItem("user");
  if (userString) {
    return JSON.parse(userString);
  }
  return null;
};

onMounted(() => {
  const user = getUserInfo();
  if (user) {
    form.value.userId = user.id;
    form.value.postedBy = user.name;
  }
});

const resetForm = () => {
  form.value = { ...initialForm };
};

const handleSubmit = async () => {
  try {
    await axios.post(
      "https://app.interimapi.com/api/v1/8aecf488-4e4d-487e-aa1b-7a3f6abacdfc/recipes",
      form.value
    );
    toast.add({
      severity: "success",
      summary: "New Perfect Flavor",
      detail: "Recipe added successfully!",
      life: 5000,
    });
    resetForm();
    // router.push("/somepage");
  } catch (error) {
    console.error("Error adding recipe:", error);
  }
};
</script>

<template>
  <div>
    <h1 class="text-3xl font-semibold text-center uppercase">
      Add a New Perfect Recipe
    </h1>
    <p class="mt-4 text-center text-lg">
      Fill in the form below to add a new recipe to the FlavorFusion Kitchen.
    </p>

    <form @submit.prevent="handleSubmit" class="mt-6 space-y-4">
      <div>
        <label for="name" class="block text-lg font-medium">Recipe Name</label>
        <input
          v-model="form.name"
          type="text"
          id="name"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-white px-4 py-2 outline-none"
          required
        />
      </div>

      <div>
        <label for="description" class="block text-lg font-medium"
          >Description</label
        >
        <textarea
          v-model="form.description"
          id="description"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-white px-4 py-2 outline-none resize-none h-[150px]"
          required
        ></textarea>
      </div>

      <div>
        <label for="ingredients" class="block text-lg font-medium"
          >Ingredients</label
        >
        <textarea
          v-model="form.ingredients"
          id="ingredients"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-white px-4 py-2 outline-none resize-none h-[150px]"
          required
        ></textarea>
      </div>

      <div>
        <label for="instructions" class="block text-lg font-medium"
          >Instructions</label
        >
        <textarea
          v-model="form.instructions"
          id="instructions"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-white px-4 py-2 outline-none resize-none h-[150px]"
          required
        ></textarea>
      </div>

      <div>
        <label for="image" class="block text-lg font-medium">Image URL</label>
        <input
          v-model="form.image"
          type="text"
          id="image"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-white px-4 py-2 outline-none"
          required
        />
      </div>

      <div>
        <label for="prepTimeMinutes" class="block text-lg font-medium"
          >Preparation Time (minutes)</label
        >
        <input
          v-model="form.prepTimeMinutes"
          type="number"
          id="prepTimeMinutes"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-white px-4 py-2 outline-none"
          required
        />
      </div>

      <div>
        <label for="cookTimeMinutes" class="block text-lg font-medium"
          >Cooking Time (minutes)</label
        >
        <input
          v-model="form.cookTimeMinutes"
          type="number"
          id="cookTimeMinutes"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-white px-4 py-2 outline-none"
          required
        />
      </div>

      <div>
        <label for="servings" class="block text-lg font-medium">Servings</label>
        <input
          v-model="form.servings"
          type="number"
          id="servings"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-white px-4 py-2 outline-none"
          required
        />
      </div>

      <div>
        <label for="difficulty" class="block text-lg font-medium"
          >Difficulty</label
        >
        <input
          v-model="form.difficulty"
          type="text"
          id="difficulty"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-white px-4 py-2 outline-none"
          required
        />
      </div>

      <div>
        <label for="cuisine" class="block text-lg font-medium">Cuisine</label>
        <input
          v-model="form.cuisine"
          type="text"
          id="cuisine"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-white px-4 py-2 outline-none"
          required
        />
      </div>

      <div>
        <label for="caloriesPerServing" class="block text-lg font-medium"
          >Calories Per Serving</label
        >
        <input
          v-model="form.caloriesPerServing"
          type="number"
          id="caloriesPerServing"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-white px-4 py-2 outline-none"
          required
        />
      </div>

      <div>
        <label for="tags" class="block text-lg font-medium"
          >Tags (comma separated)</label
        >
        <input
          v-model="form.tags"
          type="text"
          id="tags"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-white px-4 py-2 outline-none"
        />
      </div>

      <div>
        <label for="mealType" class="block text-lg font-medium"
          >Meal Type</label
        >
        <input
          v-model="form.mealType"
          type="text"
          id="mealType"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-white px-4 py-2 outline-none"
          required
        />
      </div>

      <div>
        <label for="rating" class="block text-lg font-medium">Rating</label>
        <input
          v-model="form.rating"
          type="number"
          step="0.1"
          id="rating"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-white px-4 py-2 outline-none"
          required
        />
      </div>

      <div>
        <button
          type="submit"
          class="uppercase font-bold text-md bg-green-500 w-full text-white p-4 mt-6 hover:bg-secondary-dark transition-all duration-300 ease-in-out"
        >
          Add Recipe
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 8px;
  background: #fff;
}
</style>
