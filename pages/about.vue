<script setup lang="ts">
useHead({
  title: "FlavorFusion | About Us",
  meta: [
    {
      name: "description",
      content:
        "Explore FlavorFusion, where we bring the best flavors to your table. Discover recipes, tips, and more!",
    },
  ],
});

useSeoMeta({
  title: "FlavorFusion | About Us",
  ogTitle: "FlavorFusion | About Us",
  description:
    "Discover FlavorFusion, your ultimate destination for delicious recipes and flavor inspiration. Dive into a world of culinary delights.",
  ogDescription:
    "FlavorFusion offers a variety of recipes, cooking tips, and flavor inspirations to elevate your culinary experience.",
});
</script>

<template>
  <AboutUsHeader />
  <AboutUsCompanyPrinciples />
  <AboutUsFAQ />
</template>
