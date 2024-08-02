<template>
  <section
    class="pt-10 pb-20 border-b border-main-text"
    :style="{ borderColor: 'var(--border-color)' }"
  >
    <div class="px-4 sm:px-8 md:px-12 lg:px-20">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          class="flex flex-col items-center justify-center gap-4 bg-[#e7f2ec] rounded-lg p-6 text-black"
        >
          <img src="/images/mission.png" alt="mission flag" />
          <span class="font-black text-[3rem] uppercase">Mission</span>
          <p
            class="tracking text-center text-lg md:text-xl lg:text-2xl leading-relaxed"
          >
            To inspire creativity in the kitchen with delicious, easy-to-follow
            recipes for everyone.
          </p>
        </div>
        <div
          class="flex flex-col items-center justify-center gap-4 bg-[#ecf4f6] rounded-lg p-6 text-black"
        >
          <img src="/images/vision.png" alt="vision flag" />
          <span class="font-black text-[3rem] uppercase">Vision</span>
          <p
            class="tracking text-center text-lg md:text-xl lg:text-2xl leading-relaxed"
          >
            To be the go-to source for culinary inspiration, connecting food
            lovers and enhancing every meal.
          </p>
        </div>
        <div
          class="flex flex-col items-center justify-center gap-4 bg-[#e7f2ec] rounded-lg p-6 text-black"
        >
          <img src="/images/values.png" alt="values flag" />
          <span class="font-black text-[3rem] uppercase">Values</span>
          <p
            class="tracking text-center text-lg md:text-xl lg:text-2xl leading-relaxed"
          >
            We prioritize quality ingredients, foster creativity in cooking,
            build a vibrant community of food enthusiasts, and provide
            accessible recipes for every skill level.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
