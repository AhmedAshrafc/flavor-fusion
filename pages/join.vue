<script setup lang="ts">
// definePageMeta({
//   middleware: "auth",
// });

useHead({
  title: "FlavorFusion | Join Us",
  meta: [
    {
      name: "description",
      content:
        "Explore FlavorFusion, where we bring the best flavors to your table. Discover recipes, tips, and more!",
    },
  ],
});

useSeoMeta({
  title: "FlavorFusion | Join Us",
  ogTitle: "FlavorFusion | Join Us",
  description:
    "Discover FlavorFusion, your ultimate destination for delicious recipes and flavor inspiration. Dive into a world of culinary delights.",
  ogDescription:
    "FlavorFusion offers a variety of recipes, cooking tips, and flavor inspirations to elevate your culinary experience.",
});

import { useToast } from "primevue/usetoast";
const toast = useToast();

interface UserForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  bio: string;
}

const form = ref<UserForm>({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "cooking_enthusiasts",
  phone: "",
  country: "",
  city: "",
  address: "",
  bio: "",
});

const handleSubmit = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await fetch(
      `https://app.interimapi.com/api/v1/8aecf488-4e4d-487e-aa1b-7a3f6abacdfc/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.value.name,
          email: form.value.email,
          password: form.value.password,
          role: form.value.role,
          phone: form.value.phone,
          country: form.value.country,
          city: form.value.city,
          address: form.value.address,
          bio: form.value.bio,
        }),
      }
    );

    if (response.ok) {
      toast.add({
        severity: "success",
        summary: "Welcome to your new home!",
        detail: "Signup successful",
        life: 5000,
      });
      await navigateTo("/entrance");
    } else {
      toast.add({
        severity: "error",
        summary: "Signup failed",
        detail: "Please try again",
        life: 5000,
      });
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Signup failed",
      detail: "Please try again",
      life: 5000,
    });
  }
};
</script>

<template>
  <section class="p-20 border-b border-main-text">
    <h2
      class="font-black text-center uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[7rem] leading-tight"
    >
      Join Us
    </h2>
    <div class="border border-main-text p-10">
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="name" class="block text-lg font-bold text-gray-700 mb-2"
            >Name</label
          >
          <input
            v-model="form.name"
            type="text"
            id="name"
            name="name"
            placeholder="e.g. Taha Hassan"
            class="w-full px-6 py-2 border text-white focus:outline-none focus:ring-2 focus:ring-main-text"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="email" class="block text-lg font-bold text-gray-700 mb-2"
            >Email</label
          >
          <input
            v-model="form.email"
            type="email"
            id="email"
            name="email"
            placeholder="e.g. example@example.com"
            class="w-full px-6 py-2 border text-white focus:outline-none focus:ring-2 focus:ring-main-text"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label
            for="password"
            class="block text-lg font-bold text-gray-700 mb-2"
            >Password</label
          >
          <input
            v-model="form.password"
            type="password"
            id="password"
            name="password"
            placeholder="********"
            class="w-full px-6 py-2 border text-white focus:outline-none focus:ring-2 focus:ring-main-text"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label
            for="confirm-password"
            class="block text-lg font-bold text-gray-700 mb-2"
            >Confirm Password</label
          >
          <input
            v-model="form.confirmPassword"
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="********"
            class="w-full px-6 py-2 border text-white focus:outline-none focus:ring-2 focus:ring-main-text"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="role" class="block text-lg font-bold text-gray-700 mb-2"
            >Role</label
          >
          <select
            v-model="form.role"
            id="role"
            name="role"
            class="w-full px-6 py-2 border text-white focus:outline-none focus:ring-2 focus:ring-main-text"
          >
            <option value="cooking_enthusiasts">Cooking Enthusiasts</option>
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <label for="phone" class="block text-lg font-bold text-gray-700 mb-2"
            >Phone Number</label
          >
          <input
            v-model="form.phone"
            type="tel"
            id="phone"
            name="phone"
            placeholder="e.g. +20 1004439452"
            class="w-full px-6 py-2 border text-white focus:outline-none focus:ring-2 focus:ring-main-text"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label
            for="country"
            class="block text-lg font-bold text-gray-700 mb-2"
            >Country</label
          >
          <input
            v-model="form.country"
            type="text"
            id="country"
            name="country"
            placeholder="e.g. Egypt"
            class="w-full px-6 py-2 border text-white focus:outline-none focus:ring-2 focus:ring-main-text"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="city" class="block text-lg font-bold text-gray-700 mb-2"
            >City</label
          >
          <input
            v-model="form.city"
            type="text"
            id="city"
            name="city"
            placeholder="e.g. Cairo"
            class="w-full px-6 py-2 border text-white focus:outline-none focus:ring-2 focus:ring-main-text"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label
            for="address"
            class="block text-lg font-bold text-gray-700 mb-2"
            >Address</label
          >
          <input
            v-model="form.address"
            type="text"
            id="address"
            name="address"
            placeholder="e.g. 123 Main St"
            class="w-full px-6 py-2 border text-white focus:outline-none focus:ring-2 focus:ring-main-text"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="bio" class="block text-lg font-bold text-gray-700 mb-2"
            >Bio</label
          >
          <textarea
            v-model="form.bio"
            id="bio"
            name="bio"
            placeholder="Tell us a bit about yourself"
            class="w-full px-6 py-2 border text-white focus:outline-none focus:ring-2 focus:ring-main-text"
          ></textarea>
        </div>
        <button
          type="submit"
          class="w-full py-4 mt-10 bg-main-text hover:bg-secondary-dark text-white font-bold text-lg transition duration-300"
        >
          Join Us
        </button>
      </form>
      <p class="text-center mt-10 text-gray-600">
        Already have an account?
        <NuxtLink to="/entrance" class="text-main-text font-bold"
          >Login</NuxtLink
        >
      </p>
    </div>
  </section>
</template>
