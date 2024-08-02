<template>
  <section>
    <div
      class="flex flex-col items-center gap-4 md:gap-10 text-center py-20 border-b border-main-text"
      :style="{ borderColor: 'var(--border-color)' }"
    >
      <h1
        class="font-black uppercase tracking-widest text-3xl md:text-[4rem] lg:text-[6rem]"
      >
        the new falafel
      </h1>
      <p class="text-xl">
        Experience the authentic taste of Egyptian falafel, made with fresh
        herbs and spices. Enjoy the crispy exterior and soft, flavorful
        interior, served with a side of tahini sauce and fresh vegetables.
      </p>
      <img src="/images/falafel.png" alt="Egyptian Falafel" class="" />
      <div class="flex justify-end w-full mt-10">
        <NuxtLink to="/recipes">
          <button
            class="uppercase underline decoration-wavy py-4 px-2 md:px-10 bg-main-text text-white flex gap-4 hover:scale-105 transition-transform"
          >
            let's see the recipes <i class="pi pi-arrow-up-right"></i>
          </button>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
