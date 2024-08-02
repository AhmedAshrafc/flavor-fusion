<script setup lang="ts">
useHead({
  title: "FlavorFusion | Entrance",
  meta: [
    {
      name: "description",
      content:
        "Explore FlavorFusion, where we bring the best flavors to your table. Discover recipes, tips, and more!",
    },
  ],
});

useSeoMeta({
  title: "FlavorFusion | Entrance",
  ogTitle: "FlavorFusion | Entrance",
  description:
    "Discover FlavorFusion, your ultimate destination for delicious recipes and flavor inspiration. Dive into a world of culinary delights.",
  ogDescription:
    "FlavorFusion offers a variety of recipes, cooking tips, and flavor inspirations to elevate your culinary experience.",
});

import { useToast } from "primevue/usetoast";
const toast = useToast();

interface LoginForm {
  email: string;
  password: string;
}

const form = ref<LoginForm>({
  email: "",
  password: "",
});

// const config = useRuntimeConfig();
// const apiBaseUrl = config.public.apiBaseUrl;

const handleSubmit = async () => {
  try {
    const queryParams = new URLSearchParams({
      email: form.value.email,
      password: form.value.password,
    });

    const response = await fetch(
      `https://app.interimapi.com/api/v1/8aecf488-4e4d-487e-aa1b-7a3f6abacdfc/users?${queryParams.toString()}`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      const data = await response.json();

      const user = data.find(
        (user: any) =>
          user.email === form.value.email &&
          user.password === form.value.password
      );

      if (user) {
        const { password, confirmPassword, ...userWithoutSensitiveData } = user;

        localStorage.setItem("user", JSON.stringify(userWithoutSensitiveData));

        toast.add({
          severity: "success",
          summary: "Welcome back!",
          detail: "Login successful",
          life: 5000,
        });

        await navigateTo("/");
      } else {
        toast.add({
          severity: "error",
          summary: "Login failed",
          detail: "Invalid credentials",
          life: 5000,
        });
      }
    } else {
      toast.add({
        severity: "error",
        summary: "Login failed",
        detail: "Invalid credentials",
        life: 5000,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    toast.add({
      severity: "error",
      summary: "Login failed",
      detail: "Invalid credentials",
      life: 5000,
    });
  }
};
</script>

<template>
  <section
    class="p-20 border-b border-main-text"
    :style="{ borderColor: 'var(--border-color)' }"
  >
    <h2
      class="font-black text-center uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[7rem] leading-tight"
    >
      Welcome to Cooking Enthusiasts
    </h2>

    <div
      class="border border-main-text p-10 mt-10"
      :style="{ borderColor: 'var(--border-color)' }"
    >
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="email" class="block text-lg font-bold mb-2">Email</label>
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
          <label for="password" class="block text-lg font-bold mb-2"
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

        <button
          type="submit"
          class="w-full py-4 mt-10 bg-main-text hover:bg-secondary-dark text-white font-bold text-lg transition duration-300"
        >
          Enter
        </button>
      </form>
      <p class="text-center mt-10">
        Don't have an account?
        <NuxtLink to="/join" class="font-bold">Join Us</NuxtLink>
      </p>
    </div>
  </section>
</template>
