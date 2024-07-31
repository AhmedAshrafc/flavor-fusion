<script setup lang="ts">
import axios from "axios";

useHead({
  title: "FlavorFusion | Profile",
  meta: [
    {
      name: "description",
      content:
        "Explore FlavorFusion, where we bring the best flavors to your table. Discover recipes, tips, and more!",
    },
  ],
});

useSeoMeta({
  title: "FlavorFusion | Profile",
  ogTitle: "FlavorFusion | Profile",
  description:
    "Discover FlavorFusion, your ultimate destination for delicious recipes and flavor inspiration. Dive into a world of culinary delights.",
  ogDescription:
    "FlavorFusion offers a variety of recipes, cooking tips, and flavor inspirations to elevate your culinary experience.",
});

const toast = useToast();

const user = ref<any>(null);
const favoriteRecipes = ref<any[]>([]);
const visible = ref(false);
const deleteDialogVisible = ref(false);
const editUser = reactive<any>({
  name: "",
  email: "",
  role: "",
  phone: "",
  country: "",
  city: "",
  address: "",
  bio: "",
});

const fetchUserData = async () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    user.value = JSON.parse(storedUser);

    try {
      const response = await axios.get(
        `https://app.interimapi.com/api/v1/8aecf488-4e4d-487e-aa1b-7a3f6abacdfc/favorites`,
        {
          headers: {
            Authorization: `Bearer ${user.value.token}`,
          },
        }
      );
      favoriteRecipes.value = response?.data.filter(
        (recipe: any) => recipe.user_id === user.value.id
      );
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
    }
  }
};

const openEditModal = () => {
  visible.value = true;
  Object.assign(editUser, user.value);
};

const saveChanges = async () => {
  try {
    const response = await axios.put(
      `https://app.interimapi.com/api/v1/8aecf488-4e4d-487e-aa1b-7a3f6abacdfc/users/11`,
      editUser,
      {
        headers: {
          Authorization: `Bearer ${user.value.token}`,
        },
      }
    );
    user.value = response.data;
    localStorage.setItem("user", JSON.stringify(user.value));
    visible.value = false;
    toast.add({
      severity: "success",
      summary: "Enjoy your new profile!",
      detail: "Profile updated successfully!",
      life: 5000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Profile update failed!",
      detail: "Please try again later.",
      life: 5000,
    });
  }
};

const deleteAccount = async () => {
  try {
    await axios.delete(
      `https://app.interimapi.com/api/v1/8aecf488-4e4d-487e-aa1b-7a3f6abacdfc/users/11`,
      {
        headers: {
          Authorization: `Bearer ${user.value.token}`,
        },
      }
    );
    localStorage.removeItem("user");
    toast.add({
      severity: "success",
      summary: "Account Deleted",
      detail: "Your account has been deleted successfully.",
      life: 5000,
    });
    window.location.href = "/entrance";
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Deletion Failed",
      detail:
        "An error occurred while deleting your account. Please try again later.",
      life: 5000,
    });
  }
};

const deleteFavoriteRecipe = async (recipeId: number) => {
  try {
    await axios.delete(
      `https://app.interimapi.com/api/v1/8aecf488-4e4d-487e-aa1b-7a3f6abacdfc/favorites/${recipeId}`,
      {
        headers: {
          Authorization: `Bearer ${user.value.token}`,
        },
      }
    );
    favoriteRecipes.value = favoriteRecipes.value.filter(
      (recipe: any) => recipe.id !== recipeId
    );
    toast.add({
      severity: "success",
      summary: "Recipe Deleted",
      detail: "Your favorite recipe has been deleted successfully.",
      life: 5000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Deletion Failed",
      detail:
        "An error occurred while deleting the recipe. Please try again later.",
      life: 5000,
    });
  }
};

onMounted(() => {
  fetchUserData();
});
</script>

<template>
  <section class="p-10 md:p-20 border-b border-main-text">
    <h1
      class="mb-10 text-center font-black uppercase tracking-wider text-3xl md:text-[4rem] lg:text-[5rem] leading-tight md:leading-snug lg:leading-normal"
    >
      personal profile
    </h1>
    <div
      v-if="user"
      class="italic flex flex-col gap-8 text-lg text-center md:text-left"
    >
      <div
        class="flex flex-col md:flex-row flex-wrap items-center gap-4 md:gap-10"
      >
        <p class="flex flex-col md:flex-row gap-1">
          <strong class="uppercase">Full Name: </strong> {{ user.name }}
        </p>
        <p class="flex flex-col md:flex-row gap-1">
          <strong class="uppercase">Email: </strong> {{ user.email }}
        </p>
        <p class="flex flex-col md:flex-row gap-1">
          <strong class="uppercase">Role: </strong> {{ user.role }}
        </p>
        <p class="flex flex-col md:flex-row gap-1">
          <strong class="uppercase">Phone Number: </strong> {{ user.phone }}
        </p>
      </div>
      <div
        class="flex flex-col md:flex-row flex-wrap items-center gap-4 md:gap-10"
      >
        <p class="flex flex-col md:flex-row gap-1">
          <strong class="uppercase">Country: </strong> {{ user.country }}
        </p>
        <p class="flex flex-col md:flex-row gap-1">
          <strong class="uppercase">City: </strong> {{ user.city }}
        </p>
        <p class="flex flex-col md:flex-row gap-1">
          <strong class="uppercase">Address: </strong> {{ user.address }}
        </p>
        <p class="flex flex-col md:flex-row gap-1">
          <strong class="uppercase">Short Bio: </strong> {{ user.bio }}
        </p>
      </div>
      <div class="flex flex-col md:flex-row items-center justify-end gap-8">
        <button
          @click="openEditModal"
          class="uppercase font-bold text-md bg-main-text text-white p-4 hover:bg-secondary-dark transition-all duration-300 ease-in-out"
        >
          Edit Personal Profile
        </button>
        <button
          @click="deleteDialogVisible = true"
          class="uppercase font-bold text-md bg-red-500 text-white p-4 hover:bg-red-400 transition-all duration-300 ease-in-out"
        >
          Delete Account
        </button>
      </div>
    </div>
    <div v-else class="text-center">
      <p class="text-2xl">Sorry! No user information available.</p>
      <p>
        Make sure you are logged in!
        <NuxtLink to="/entrance" class="underline">Log in now</NuxtLink>
      </p>
    </div>

    <Dialog
      v-model:visible="visible"
      maximizable
      modal
      header="Edit Personal Profile"
      :style="{ width: '50rem' }"
      class="p-5 uppercase"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div class="p-fluid">
        <div class="flex flex-col gap-1 mb-4">
          <label for="name">Full Name</label>
          <InputText id="name" v-model="editUser.name" />
        </div>
        <div class="flex flex-col gap-1 mb-4">
          <label for="email">Email</label>
          <InputText id="email" v-model="editUser.email" />
        </div>
        <div class="flex flex-col gap-1 mb-4">
          <label for="role">Role</label>
          <InputText id="role" v-model="editUser.role" disabled />
          <span>We're sorry! You won't be able to edit your "Role"</span>
        </div>
        <div class="flex flex-col gap-1 mb-4">
          <label for="phone">Phone Number</label>
          <InputText id="phone" v-model="editUser.phone" />
        </div>
        <div class="flex flex-col gap-1 mb-4">
          <label for="country">Country</label>
          <InputText id="country" v-model="editUser.country" />
        </div>
        <div class="flex flex-col gap-1 mb-4">
          <label for="city">City</label>
          <InputText id="city" v-model="editUser.city" />
        </div>
        <div class="flex flex-col gap-1 mb-4">
          <label for="address">Address</label>
          <InputText id="address" v-model="editUser.address" />
        </div>
        <div class="flex flex-col gap-1 mb-4">
          <label for="bio">Short Bio</label>
          <InputText id="bio" v-model="editUser.bio" />
        </div>
        <button
          label="Save Changes"
          @click="saveChanges"
          class="uppercase font-bold text-md bg-green-500 w-full text-white p-4 mt-6 hover:bg-secondary-dark transition-all duration-300 ease-in-out"
        >
          save changes
        </button>
      </div>
    </Dialog>
    <Dialog
      v-model:visible="deleteDialogVisible"
      modal
      header="Confirm Account Deletion"
      :style="{ width: '30rem' }"
      class="p-5 uppercase"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div class="p-fluid">
        <div class="text-center">
          <i class="pi pi-exclamation-triangle text-red-500 text-3xl mb-4"></i>
        </div>
        <p>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
        <div class="flex gap-8 mt-4">
          <button
            @click="deleteAccount"
            class="uppercase font-bold text-md bg-red-500 w-full text-white p-4 mt-6 hover:bg-secondary-dark transition-all duration-300 ease-in-out"
          >
            delete account
          </button>
        </div>
      </div>
    </Dialog>

    <h1
      class="mt-20 text-center font-black uppercase tracking-wider text-3xl md:text-[4rem] lg:text-[5rem] leading-tight md:leading-snug lg:leading-normal"
    >
      your favorite egyptian recipes
    </h1>
    <p class="uppercase font-bold text-center text-lg">
      give it a try at your own comfort. we're sure you'll like it. no rush!
    </p>
    <div class="my-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="119"
        viewBox="0 0 24 119"
        role="img"
        aria-labelledby="arrow-title"
        class="mx-auto"
      >
        <title id="arrow-title">down arrow</title>
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.23"
          d="M12 2.46v113.6M22.59 100.88 12 116.06 1.41 100.88"
        />
      </svg>
    </div>

    <div class="mt-10">
      <div
        v-if="favoriteRecipes.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 px-5 sm:px-10 md:px-20"
      >
        <div
          v-for="recipe in favoriteRecipes"
          :key="recipe.id"
          class="border border-main-text p-6 rounded-md flex flex-col gap-2 shadow-md relative"
        >
          <h3 class="text-xl font-bold">{{ recipe.recipe_name }}</h3>
          <NuxtLink :to="recipe.recipe_url" class="underline"
            >View Recipe</NuxtLink
          >
          <button
            @click="deleteFavoriteRecipe(recipe.id)"
            class="absolute top-4 right-4 text-red-500 hover:text-red-700"
          >
            <i class="pi pi-trash text-[1rem]"></i>
          </button>
        </div>
      </div>
      <p v-else class="text-center text-lg flex flex-col">
        No favorite recipes found.
        <NuxtLink to="/recipes" class="underline text-lg"
          >Explore more recipes</NuxtLink
        >
      </p>
    </div>
  </section>
</template>
