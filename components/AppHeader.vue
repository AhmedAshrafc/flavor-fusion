<script setup lang="ts">
import dayjs from "dayjs";
import { useToast } from "primevue/usetoast";
const toast = useToast();
import { useSearchResultsStore } from "~/stores/searchResultsStore";

const currentDate = ref("");
const isLoggedIn = ref(false);

const router = useRouter();

const checkAuthStatus = () => {
  isLoggedIn.value = localStorage.getItem("user") !== null;
};

const handleLogout = () => {
  localStorage.removeItem("user");
  isLoggedIn.value = false;
  router.push("/entrance");
  toast.add({
    severity: "success",
    summary: "Goodbye! Until next time!",
    detail: "Logout successful",
    life: 5000,
  });
};

const searchResultsStore = useSearchResultsStore();

const searchInput = ref("");

const performSearch = async () => {
  const url = `https://app.interimapi.com/api/v1/8aecf488-4e4d-487e-aa1b-7a3f6abacdfc/recipes?search=${encodeURIComponent(
    searchInput.value
  )}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    searchResultsStore.setSearchResults(data);
    router.push("/search-results");
    searchInput.value = "";
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
  }
};

onMounted(() => {
  checkAuthStatus();
  currentDate.value = dayjs().format("dddd, MMMM D, YYYY");
});
</script>

<template>
  <header>
    <div
      class="flex flex-col md:flex-row items-stretch border-b border-main-text"
    >
      <div
        class="flex-shrink-0 border-b md:border-r md:border-b-0 border-main-text p-10 flex items-center justify-center"
      >
        <NuxtLink to="/" exact-active-class="inactive-link">
          <img
            src="/images/flavorfusion-logo.png"
            alt="Flavor Fusion Logo"
            class="w-48"
          />
        </NuxtLink>
      </div>
      <div
        class="flex-1 border-b md:border-r md:border-b-0 border-main-text py-10 md:py-6 flex flex-col items-center justify-center text-center uppercase"
      >
        <span class="text-sm md:text-base">{{ currentDate }}</span>
        <h1 class="text-[4rem] font-black tracking-widest">flavor fusion</h1>
        <h2 class="text-[1.5rem]">the greatest egyptian recipes</h2>
        <div class="relative w-full lg:w-1/2 mt-4 p-6 lg:p-0">
          <input
            type="text"
            class="bg-transparent border border-main-text w-full py-2 px-4 outline-none"
            placeholder="Search the world of recipes..."
            v-model="searchInput"
          />
          <button
            @click="performSearch"
            class="lg:absolute right-0 top-0 bottom-0 px-4 py-2 mt-4 lg:mt-0 bg-main-text text-white hover:bg-secondary-dark transition-all duration-300 ease-in-out"
          >
            Search
          </button>
        </div>
      </div>
      <div
        class="flex-shrink-0 md:border-b-0 border-main-text p-10 flex flex-col items-center justify-center gap-6 text-lg font-black uppercase"
      >
        <span>recipes Market</span>
        <div class="flex items-center justify-center gap-4">
          <img src="/images/egypt.png" alt="Egypt Flag" class="w-6" />
          <span>egypt Market</span>
        </div>
      </div>
    </div>

    <nav>
      <ul
        class="border-b border-main-text uppercase font-black flex flex-col gap-8 py-10 md:flex-row flex-wrap items-center justify-between md:py-6 md:px-8"
      >
        <li>
          <NuxtLink to="/" exact-active-class="active-link" class="nav-link">
            <BaseButton href="/">Home</BaseButton>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/about"
            exact-active-class="active-link"
            class="nav-link"
          >
            <BaseButton href="/about">about us</BaseButton>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/recipes"
            exact-active-class="active-link"
            class="nav-link"
          >
            <BaseButton href="/recipes">recipes</BaseButton>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" exact-active-class="active-link" class="nav-link">
            <BaseButton href="/">special recipes</BaseButton>
          </NuxtLink>
        </li>
        <li v-if="!isLoggedIn">
          <NuxtLink
            to="/entrance"
            exact-active-class="active-link"
            class="nav-link"
          >
            <BaseButton href="/entrance">entrance</BaseButton>
          </NuxtLink>
        </li>
        <li v-if="!isLoggedIn">
          <NuxtLink
            to="/join"
            exact-active-class="active-link"
            class="nav-link"
          >
            <BaseButton href="/join">join Us</BaseButton>
          </NuxtLink>
        </li>
        <li v-if="isLoggedIn">
          <BaseButton @click="handleLogout">Logout</BaseButton>
        </li>
        <li v-if="isLoggedIn">
          <NuxtLink
            to="/profile"
            exact-active-class="active-link"
            class="nav-link"
          >
            <BaseButton href="/profile">Profile</BaseButton>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.inactive-link {
  background-color: transparent;
}
</style>
<style scoped>
.inactive-link {
  background-color: transparent;
}
</style>
