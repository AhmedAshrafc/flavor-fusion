import { ref } from "vue";
import axios from "axios";

export function useData() {
  const recipes = ref([]);
  const reviews = ref([]);
  const favorites = ref([]);
  const users = ref([]);

  const fetchData = async () => {
    try {
      const [
        recipesResponse,
        reviewsResponse,
        favoritesResponse,
        usersResponse,
      ] = await Promise.all([
        axios.get(
          "https://app.interimapi.com/api/v1/8aecf488-4e4d-487e-aa1b-7a3f6abacdfc/recipes"
        ),
        axios.get(
          "https://app.interimapi.com/api/v1/8aecf488-4e4d-487e-aa1b-7a3f6abacdfc/reviews"
        ),
        axios.get(
          "https://app.interimapi.com/api/v1/8aecf488-4e4d-487e-aa1b-7a3f6abacdfc/favorites"
        ),
        axios.get(
          "https://app.interimapi.com/api/v1/8aecf488-4e4d-487e-aa1b-7a3f6abacdfc/users"
        ),
      ]);

      recipes.value = recipesResponse.data;
      reviews.value = reviewsResponse.data;
      favorites.value = favoritesResponse.data;
      users.value = usersResponse.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return {
    recipes,
    reviews,
    favorites,
    users,
    fetchData,
  };
}
