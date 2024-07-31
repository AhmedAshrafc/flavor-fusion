<script setup lang="ts">
// const title = ref("Home Page");
const logoUrl = new URL("/images/flavorfusion-logo.png", import.meta.url).href;

useHead({
  title: "FlavorFusion | Home",
  meta: [
    {
      name: "description",
      content:
        "Explore FlavorFusion, where we bring the best flavors to your table. Discover recipes, tips, and more!",
    },
  ],
});

// useHead({
//   title: title,
//   titleTemplate: (titleChunk) => {
//     return titleChunk ? `${titleChunk} - Site Title` : "Site Title";
//   },
// });

useSeoMeta({
  title: "FlavorFusion | Home",
  ogTitle: "FlavorFusion | Home",
  description:
    "Discover FlavorFusion, your ultimate destination for delicious recipes and flavor inspiration. Dive into a world of culinary delights.",
  ogDescription:
    "FlavorFusion offers a variety of recipes, cooking tips, and flavor inspirations to elevate your culinary experience.",
  ogImage: logoUrl,
  twitterCard: "summary_large_image",
  twitterImage: logoUrl,
});
</script>

<template>
  <div class="p-6">
    <HomeFeaturedItem />
    <HomeAboutSection />
    <HomeFeaturedTopItems />
    <HomeServicesSection />
  </div>
</template>
