<template>
  <section
    class="p-10 md:p-20 border-b border-main-text"
    :style="{ borderColor: 'var(--border-color)' }"
  >
    <h1
      class="flex mb-6 items-center justify-center gap-6 font-black text-center uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[7rem] leading-tight"
    >
      frequently asked questions
    </h1>
    <p class="font-bold text-center capitalize mb-10 -mt-4">
      you deserve to know more and we are here to answer you
    </p>
    <div class="card">
      <Accordion value="0">
        <AccordionPanel value="0">
          <AccordionHeader>What types of recipes do you offer?</AccordionHeader>
          <AccordionContent>
            <p class="m-0">
              We offer a diverse range of Egyptian recipes including appetizers,
              main courses, desserts, and beverages. Our collection features
              easy-to-follow recipes for every occasion, from quick weeknight
              dinners to elaborate holiday feasts.
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="1">
          <AccordionHeader>Can I submit my own recipes?</AccordionHeader>
          <AccordionContent>
            <p class="m-0">
              Absolutely! We welcome user submissions and love to feature
              recipes from our community. Simply visit our "Submit a Recipe"
              page and follow the instructions to share your culinary creations
              with us.
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="2">
          <AccordionHeader
            >How do I find recipes for special dietary needs?</AccordionHeader
          >
          <AccordionContent>
            <p class="m-0">
              You can use our advanced search filters to find recipes that cater
              to specific dietary needs such as gluten-free, vegetarian, or
              keto. We ensure our recipes include detailed ingredient lists and
              nutritional information.
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="3">
          <AccordionHeader>Are the recipes easy to follow?</AccordionHeader>
          <AccordionContent>
            <p class="m-0">
              Yes, our recipes are designed to be user-friendly with
              step-by-step instructions and helpful tips. We aim to make cooking
              enjoyable and accessible for both novice and experienced cooks.
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="4">
          <AccordionHeader>Can I save my favorite recipes?</AccordionHeader>
          <AccordionContent>
            <p class="m-0">
              Yes, you can save your favorite recipes to your personal recipe
              box in your profile for easy access. Simply click the "Add To
              Favorite" button on any recipe page to add it to your collection.
            </p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  </section>
</template>

<style>
.p-accordioncontent-content {
  padding: 2rem !important;
  background-color: #ecf4f6 !important;
  color: #000 !important;
}

.p-accordionheader:hover {
  color: #fff !important;
}
</style>
