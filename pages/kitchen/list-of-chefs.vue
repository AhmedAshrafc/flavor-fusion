<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  title: "Home - FlavorFusion Kitchen",
});

useHead({
  title: "FlavorFusion | List of Chefs",
  meta: [
    {
      name: "description",
      content:
        "Explore FlavorFusion, where we bring the best flavors to your table. Discover recipes, tips, and more!",
    },
  ],
});

useSeoMeta({
  title: "FlavorFusion | List of Chefs",
  ogTitle: "FlavorFusion | List of Chefs",
  description:
    "Discover FlavorFusion, your ultimate destination for delicious recipes and flavor inspiration. Dive into a world of culinary delights.",
  ogDescription:
    "FlavorFusion offers a variety of recipes, cooking tips, and flavor inspirations to elevate your culinary experience.",
});
</script>

<template>
  <h1>table with a list of chefs here</h1>
  <p>table should show the following:</p>
  <ul class="list-decimal">
    <li>chef name</li>
    <li>hired by who</li>
    <li>chef position - professional chef/supervisor chef or normal chef</li>
    <li>hiring date</li>
    <li>how many recipes each chef owns</li>
    <li>chef status - active/inactive/under training/retired/etc...</li>
    <li>
      professional chef/supervisor chef should have the ability to leave a note
      to normal chefs but NOT vice versa
    </li>
    <li>table should be searchable by chef name</li>
  </ul>
</template>
