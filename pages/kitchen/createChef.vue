<script setup lang="ts">
import axios from "axios";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

definePageMeta({
  layout: "dashboard",
  title: "Create New Chef - FlavorFusion",
});

useHead({
  title: "FlavorFusion | Hire New Chef",
  meta: [
    {
      name: "description",
      content:
        "Explore FlavorFusion, where we bring the best flavors to your table. Discover recipes, tips, and more!",
    },
  ],
});

useSeoMeta({
  title: "FlavorFusion | Hire New Chef",
  ogTitle: "FlavorFusion | Hire New Chef",
  description:
    "Discover FlavorFusion, your ultimate destination for delicious recipes and flavor inspiration. Dive into a world of culinary delights.",
  ogDescription:
    "FlavorFusion offers a variety of recipes, cooking tips, and flavor inspirations to elevate your culinary experience.",
});

const toast = useToast();
const router = useRouter();

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "chef",
  country: "",
  city: "",
  address: "",
  bio: "",
  phone: "",
};

const form = ref({ ...initialForm });

const resetForm = () => {
  form.value = { ...initialForm };
};

const handleSubmit = async () => {
  try {
    await axios.post(
      "https://app.interimapi.com/api/v1/8aecf488-4e4d-487e-aa1b-7a3f6abacdfc/users",
      form.value
    );
    toast.add({
      severity: "success",
      summary: "Say Hello to the New Chef!",
      detail: "Chef added successfully!",
      life: 5000,
    });
    resetForm();
    // router.push("/chefs");
  } catch (error) {
    console.error("Error adding chef:", error);
  }
};
</script>

<template>
  <div>
    <h1 class="text-3xl font-semibold text-center uppercase">
      Hire a New Chef
    </h1>
    <p class="mt-4 text-center text-lg">
      Fill in the form below to hire a new chef to the FlavorFusion Kitchen.
    </p>

    <form @submit.prevent="handleSubmit" class="mt-6 space-y-4">
      <div>
        <label for="name" class="block text-lg font-medium">Name</label>
        <input
          v-model="form.name"
          type="text"
          id="name"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 outline-none text-white"
          required
        />
      </div>

      <div>
        <label for="email" class="block text-lg font-medium">Email</label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 outline-none text-white"
          required
        />
      </div>

      <div>
        <label for="password" class="block text-lg font-medium">Password</label>
        <input
          v-model="form.password"
          type="password"
          id="password"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 outline-none text-white"
          required
        />
      </div>

      <div>
        <label for="confirmPassword" class="block text-lg font-medium"
          >Confirm Password</label
        >
        <input
          v-model="form.confirmPassword"
          type="password"
          id="confirmPassword"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 outline-none text-white"
          required
        />
      </div>

      <div>
        <label for="country" class="block text-lg font-medium">Country</label>
        <input
          v-model="form.country"
          type="text"
          id="country"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 outline-none text-white"
          required
        />
      </div>

      <div>
        <label for="city" class="block text-lg font-medium">City</label>
        <input
          v-model="form.city"
          type="text"
          id="city"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 outline-none text-white"
          required
        />
      </div>

      <div>
        <label for="address" class="block text-lg font-medium">Address</label>
        <input
          v-model="form.address"
          type="text"
          id="address"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 outline-none text-white"
        />
      </div>

      <div>
        <label for="phone" class="block text-lg font-medium">Phone</label>
        <input
          v-model="form.phone"
          type="text"
          id="phone"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 outline-none text-white"
        />
      </div>

      <div>
        <label for="bio" class="block text-lg font-medium">Bio</label>
        <textarea
          v-model="form.bio"
          id="bio"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 outline-none text-white resize-none h-[150px]"
        ></textarea>
      </div>

      <div>
        <button
          type="submit"
          class="uppercase font-bold text-md bg-green-500 w-full text-white p-4 mt-6 hover:bg-secondary-dark transition-all duration-300 ease-in-out"
        >
          Add Chef
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
