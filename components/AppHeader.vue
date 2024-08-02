<script setup lang="ts">
import dayjs from "dayjs";
import { useToast } from "primevue/usetoast";
const toast = useToast();
import { useSearchResultsStore } from "~/stores/searchResultsStore";

const switchLocalePath = useSwitchLocalePath();
const { t } = useI18n();

const currentDate = ref("");
const isLoggedIn = ref(false);
const isChef = ref(false);

const router = useRouter();

const checkAuthStatus = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user && user.role) {
    isLoggedIn.value = true;
    isChef.value = user.role === "chef";
  } else {
    isLoggedIn.value = false;
    isChef.value = false;
  }
};

const handleLogout = () => {
  localStorage.removeItem("user");
  isLoggedIn.value = false;
  isChef.value = false;
  router.push("/entrance");
  toast.add({
    severity: "success",
    summary: t("goodbyeMessage"),
    detail: t("logoutSuccess"),
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
    router.push({
      path: "/search-results",
      query: { term: searchInput.value },
    });
    searchInput.value = "";
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
  }
};

onMounted(() => {
  checkAuthStatus();
  currentDate.value = dayjs().format("dddd, MMMM D, YYYY");
});

const colorMode = useColorMode();

const logoSrc = computed(() => {
  if (colorMode.preference === "dark" || colorMode.preference === "system") {
    return "/images/flavorfusion-logo-light.png";
  } else if (colorMode.preference === "light") {
    return "/images/flavorfusion-logo-dark.png";
  } else {
    return "/images/flavorfusion-logo-dark.png";
  }
});

// console.log(colorMode.preference);
</script>

<template>
  <header>
    <div
      class="flex flex-col md:flex-row items-stretch border-b border-main-text"
      :style="{ borderColor: 'var(--border-color)' }"
    >
      <div
        class="flex-shrink-0 border-b md:border-r md:border-b-0 border-main-text p-10 flex items-center justify-center"
        :style="{ borderColor: 'var(--border-color)' }"
      >
        <NuxtLink to="/" exact-active-class="inactive-link">
          <img :src="logoSrc" alt="Flavor Fusion Logo" class="w-48" />
        </NuxtLink>
      </div>
      <div
        class="flex-1 border-b md:border-r md:border-b-0 border-main-text py-10 md:py-6 flex flex-col items-center justify-center text-center uppercase"
        :style="{ borderColor: 'var(--border-color)' }"
      >
        <span class="text-sm md:text-base">{{ currentDate }}</span>
        <h1 class="text-[4rem] font-black tracking-widest">flavor fusion</h1>
        <h2 class="text-[1.5rem]">{{ t("recipesMarket") }}</h2>
        <div class="relative w-full lg:w-1/2 mt-4 p-6 lg:p-0">
          <form @submit.prevent="performSearch">
            <input
              type="text"
              class="bg-transparent border border-main-text w-full py-2 px-4 outline-none"
              :style="{ borderColor: 'var(--border-color)' }"
              :placeholder="t('searchPlaceholder')"
              v-model="searchInput"
              v-tooltip.top="t('searchPlaceholder')"
            />
            <button
              type="submit"
              class="lg:absolute right-0 top-0 bottom-0 px-4 py-2 mt-4 lg:mt-0 bg-main-text text-white hover:bg-secondary-dark transition-all duration-300 ease-in-out border"
              :style="{ borderColor: 'var(--border-color)' }"
            >
              {{ t("searchButton") }}
            </button>
          </form>
        </div>
      </div>
      <div
        class="flex-shrink-0 md:border-b-0 border-main-text p-10 flex flex-col items-center justify-center gap-6 text-lg font-black uppercase"
        :style="{ borderColor: 'var(--border-color)' }"
      >
        <span>{{ t("recipesMarket") }}</span>
        <div class="flex items-center justify-center gap-4">
          <img src="/images/egypt.png" alt="Egypt Flag" class="w-6" />
          <span>{{ t("egyptMarket") }}</span>
        </div>
        <div class="w-full">
          <div class="text-center text-sm mb-2">
            <span v-if="$colorMode.preference === 'dark'"
              >{{ t("moonShining") }} <i class="pi pi-moon"></i
            ></span>
            <span v-if="$colorMode.preference === 'system'"
              >{{ t("unsureShining") }} <i class="pi pi-spinner-dotted"></i
            ></span>
            <span v-if="$colorMode.preference === 'light'"
              >{{ t("sunOut") }} <i class="pi pi-sun"></i
            ></span>
            <span v-if="$colorMode.preference === 'sepia'"
              >{{ t("dusty") }} <i class="pi pi-cloud"></i
            ></span>
          </div>
          <select
            v-model="$colorMode.preference"
            class="text-white outline-none w-full text-center"
          >
            <option value="system">{{ t("system") }}</option>
            <option value="light">{{ t("light") }}</option>
            <option value="dark">{{ t("dark") }}</option>
            <option value="sepia">{{ t("sepia") }}</option>
          </select>
          <div class="flex items-center justify-center gap-2 mt-4">
            <NuxtLink
              :to="switchLocalePath('en')"
              class="uppercase font-bold bg-main-text text-white py-1 px-4 hover:bg-secondary-dark transition-all duration-300 ease-in-out"
              >English</NuxtLink
            >
            <NuxtLink
              :to="switchLocalePath('ar')"
              class="uppercase font-bold bg-main-text text-white py-1 px-4 hover:bg-secondary-dark transition-all duration-300 ease-in-out"
              >العربية</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>

    <nav>
      <ul
        class="border-b border-main-text uppercase font-black flex flex-col gap-8 py-10 md:flex-row flex-wrap items-center justify-between md:py-6 md:px-8"
        :style="{ borderColor: 'var(--border-color)' }"
      >
        <li>
          <NuxtLink to="/" exact-active-class="active-link" class="nav-link">
            <BaseButton href="/">{{ t("home") }}</BaseButton>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/about"
            exact-active-class="active-link"
            class="nav-link"
          >
            <BaseButton href="/about">{{ t("aboutUs") }}</BaseButton>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/recipes"
            exact-active-class="active-link"
            class="nav-link"
          >
            <BaseButton href="/recipes">{{ t("recipes") }}</BaseButton>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" exact-active-class="active-link" class="nav-link">
            <BaseButton href="/">{{ t("specialRecipes") }}</BaseButton>
          </NuxtLink>
        </li>
        <li v-if="!isLoggedIn">
          <NuxtLink
            to="/entrance"
            exact-active-class="active-link"
            class="nav-link"
          >
            <BaseButton href="/entrance">{{ t("entrance") }}</BaseButton>
          </NuxtLink>
        </li>
        <li v-if="!isLoggedIn">
          <NuxtLink
            to="/join"
            exact-active-class="active-link"
            class="nav-link"
          >
            <BaseButton href="/join">{{ t("joinUs") }}</BaseButton>
          </NuxtLink>
        </li>
        <li v-if="isLoggedIn && isChef">
          <NuxtLink
            to="/kitchen"
            exact-active-class="active-link"
            class="nav-link"
            v-tooltip.top="'Only accessible by chefs'"
          >
            <BaseButton href="/kitchen">{{ t("kitchen") }}</BaseButton>
          </NuxtLink>
        </li>
        <li v-if="isLoggedIn">
          <NuxtLink
            to="/profile"
            exact-active-class="active-link"
            class="nav-link"
          >
            <BaseButton href="/profile">{{ t("profile") }}</BaseButton>
          </NuxtLink>
        </li>
        <li v-if="isLoggedIn">
          <BaseButton @click="handleLogout">{{ t("logout") }}</BaseButton>
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
