<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useData } from "@/composables/useData";

definePageMeta({
  layout: "dashboard",
  title: "Home - FlavorFusion Kitchen",
});

const { recipes, reviews, favorites, fetchData } = useData();

const recipesChartData = ref({});
const favoritesChartData = ref({});
const reviewsChartData = ref({});
const barChartData = ref({});
const chartOptions = ref({});
const barChartOptions = ref({});

onMounted(async () => {
  await fetchData();

  recipesChartData.value = {
    labels: ["Total Recipes"],
    datasets: [
      {
        data: [recipes.value.length],
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  favoritesChartData.value = {
    labels: ["Total Favorites"],
    datasets: [
      {
        data: [favorites.value.length],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  reviewsChartData.value = {
    labels: ["Total Reviews"],
    datasets: [
      {
        data: [reviews.value.length],
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const labels = recipes.value.map((recipe: any) => recipe.name);
  const prepTimes = recipes.value.map((recipe: any) => recipe.prepTimeMinutes);
  const cookTimes = recipes.value.map((recipe: any) => recipe.cookTimeMinutes);
  const ratings = recipes.value.map((recipe: any) => recipe.rating);

  barChartData.value = {
    labels,
    datasets: [
      {
        label: "Preparation Time (minutes)",
        data: prepTimes,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Cooking Time (minutes)",
        data: cookTimes,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Rating",
        data: ratings,
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  );

  chartOptions.value = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: textColor,
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return tooltipItem.raw;
          },
        },
      },
    },
  };

  barChartOptions.value = {
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
});
</script>

<template>
  <div>
    <h1 class="text-3xl font-semibold text-center uppercase">
      FlavorFusion Kitchen Dashboard
    </h1>
    <p class="mt-4 text-center text-lg">
      Welcome to the FlavorFusion Kitchen dashboard. Here you can view various
      statistics about your recipes, reviews, and favorites.
    </p>

    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
    >
      <div class="card">
        <h2 class="text-xl font-bold">Total Recipes</h2>
        <Chart
          type="doughnut"
          :data="recipesChartData"
          :options="chartOptions"
        />
      </div>
      <div class="card">
        <h2 class="text-xl font-bold">Total Favorites</h2>
        <Chart
          type="doughnut"
          :data="favoritesChartData"
          :options="chartOptions"
        />
      </div>
      <div class="card">
        <h2 class="text-xl font-bold">Total Reviews</h2>
        <Chart
          type="doughnut"
          :data="reviewsChartData"
          :options="chartOptions"
        />
      </div>
    </div>

    <div class="card mt-6">
      <h2 class="text-xl font-bold">Recipe Details</h2>
      <Chart type="bar" :data="barChartData" :options="barChartOptions" />
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 8px;
  background: #fff;
  text-align: center;
}
</style>
