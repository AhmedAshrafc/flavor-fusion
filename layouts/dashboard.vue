<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const isOpen = ref(true);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const sidebarClasses = computed(() => ({
  "w-64": isOpen.value,
  "w-20": !isOpen.value,
}));

const user = ref<any>(null);

const fetchUserData = async () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }
};

onMounted(() => {
  fetchUserData();
});
</script>

<template>
  <div
    class="m-10 border border-main-text container mx-auto"
    :style="{ borderColor: 'var(--border-color)' }"
  >
    <AppHeader />

    <div
      class="flex flex-col md:flex-row border-b border-main-text"
      :style="{ borderColor: 'var(--border-color)' }"
    >
      <!-- the sidebar -->
      <div
        :class="sidebarClasses"
        class="bg-gray-800 text-white min-h-screen transition-width duration-300 relative"
      >
        <button
          @click="toggleSidebar"
          class="flex items-center justify-center absolute top-4 -right-5 z-10 bg-[#30d599] text-black p-2 rounded-full hover:bg-[#19ec9f] transition-all duration-300 ease-in-out"
        >
          <i
            :class="isOpen ? 'pi pi-angle-left' : 'pi pi-angle-right'"
            class="text-2xl transition-transform duration-300"
          ></i>
        </button>

        <!-- sidebar links -->
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
                to="/kitchen/list-of-chefs"
                exact-active-class="active-link"
                class="nav-link flex items-center gap-4 hover:bg-gray-700 p-2 rounded"
                v-tooltip="isOpen ? '' : 'Chefs'"
              >
                <i class="pi pi-address-book text-xl"></i>
                <span v-if="isOpen" class="text-xl">Chefs</span>
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
            <li
              v-if="isOpen"
              class="mb-2 mt-10 relative bg-rose-600 p-4 text-center"
            >
              <span
                >Welcome Chef,
                <span class="uppercase italic">{{ user?.name }}</span></span
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- main content -->
      <div
        class="flex-1 p-8 border border-main-text"
        :style="{ borderColor: 'var(--border-color)' }"
      >
        <NuxtPage />
      </div>
    </div>
    <AppFooter />
    <ScrollTop />
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
