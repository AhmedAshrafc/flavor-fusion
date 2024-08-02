<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

useHead({
  title: "FlavorFusion | Kitchen",
  meta: [
    {
      name: "description",
      content:
        "Explore FlavorFusion, where we bring the best flavors to your table. Discover recipes, tips, and more!",
    },
  ],
});

useSeoMeta({
  title: "FlavorFusion | Kitchen",
  ogTitle: "FlavorFusion | Kitchen",
  description:
    "Discover FlavorFusion, your ultimate destination for delicious recipes and flavor inspiration. Dive into a world of culinary delights.",
  ogDescription:
    "FlavorFusion offers a variety of recipes, cooking tips, and flavor inspirations to elevate your culinary experience.",
});

const isOpen = ref(true);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const sidebarClasses = computed(() => ({
  "w-64": isOpen.value,
  "w-20": !isOpen.value,
}));
</script>

<template>
  <div class="m-10 border border-main-text container mx-auto">
    <AppHeader />

    <div class="flex flex-col md:flex-row p-10 border-b border-main-text">
      <!-- Sidebar -->
      <div
        :class="sidebarClasses"
        class="bg-gray-800 text-white min-h-screen transition-width duration-300 relative"
      >
        <!-- Toggle Button -->
        <button
          @click="toggleSidebar"
          class="flex items-center justify-center absolute top-4 -right-5 z-10 bg-[#30d599] text-black p-2 rounded-full"
        >
          <i
            :class="isOpen ? 'pi pi-angle-left' : 'pi pi-angle-right'"
            class="text-2xl transition-transform duration-300"
          ></i>
        </button>

        <!-- Sidebar Links -->
        <div class="mt-16 p-4">
          <ul>
            <li class="mb-2 relative">
              <NuxtLink
                to="/kitchen"
                exact-active-class="active-link"
                class="nav-link flex items-center gap-4 hover:bg-gray-700 p-2 rounded"
                v-tooltip="isOpen ? '' : 'Home'"
              >
                <i class="pi pi-home text-xl"></i>
                <span v-if="isOpen" class="text-xl">Home</span>
              </NuxtLink>
            </li>
            <li class="mb-2 relative">
              <NuxtLink
                to="/kitchen/cooking"
                exact-active-class="active-link"
                class="nav-link flex items-center gap-4 hover:bg-gray-700 p-2 rounded"
                v-tooltip="isOpen ? '' : 'Kitchen Station (cooking)'"
              >
                <i class="pi pi-sparkles text-xl"></i>
                <span v-if="isOpen" class="text-xl">Kitchen Station</span>
              </NuxtLink>
            </li>
            <li class="mb-2 relative">
              <NuxtLink
                to="/kitchen/createChef"
                exact-active-class="active-link"
                class="nav-link flex items-center gap-4 hover:bg-gray-700 p-2 rounded"
                v-tooltip="isOpen ? '' : 'Create New Chef'"
              >
                <i class="pi pi-user text-xl"></i>
                <span v-if="isOpen" class="text-xl">Create New Chef</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1 p-8 border border-main-text">
        <NuxtPage />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
.nav-link {
  position: relative;
}

.nav-link .tooltip {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateX(0.5rem) translateY(-50%);
  background-color: #333;
  color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  white-space: nowrap;
}
</style>
