<template>
  <footer class="py-10 pb-0 md:px-8">
    <div class="flex flex-col md:flex-row border-b border-main-text">
      <div class="flex flex-col gap-10 mb-10">
        <h2
          class="font-black text-center md:text-left uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[7rem] leading-tight"
        >
          do you have any questions?
        </h2>
        <div
          class="flex flex-col md:flex-row items-center gap-10 md:gap-20 text-center md:text-left"
        >
          <div class="flex flex-col">
            <span class="uppercase font-bold text-xl">address</span>
            <NuxtLink
              to="https://www.google.com/maps/search/?api=1&query=215+Street+Loran,+Alexandria,+Egypt"
              target="_blank"
              class="text-lg flex items-center gap-2"
            >
              <i class="pi pi-map-marker"></i>
              215 Street Loran, Alexandria. Egypt
            </NuxtLink>
          </div>

          <div class="flex flex-col">
            <span class="uppercase font-bold text-xl">phone</span>
            <span class="text-lg flex items-center gap-2">
              <i class="pi pi-phone"></i>
              +20 1004439452</span
            >
          </div>
          <div class="flex flex-col">
            <span class="uppercase font-bold text-xl">email</span>
            <NuxtLink
              to="mailto:ahmed.ashraf.saad@gmail.com"
              class="text-lg flex items-center gap-2"
            >
              <i class="pi pi-envelope"></i>
              ahmed.ashraf.saad@gmail.com
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4 mb-10 p-4 md:p-0">
        <h2
          class="font-black text-center md:text-left uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[7rem] leading-tight"
        >
          stay in touch
        </h2>
        <p class="text-lg text-center leading-relaxed">
          Join our mailing list and keep up to all the special recipes we have
          to offer!
        </p>
        <div
          class="flex items-center justify-center md:justify-start gap-2 md:ml-3"
        >
          <i class="pi pi-thumbtack"></i>
          <button class="underline text-xl">Subscribe</button>
        </div>
      </div>
    </div>

    <div class="py-6 px-4">
      <div
        class="flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-between text-center md:text-left"
      >
        <span class="uppercase font-bold text-lg"
          >&copy; 2024 flavorfusion franchising, llc
        </span>
        <span class="uppercase font-bold text-lg">recipes market in egypt</span>
        <NuxtLink
          to="https://github.com/AhmedAshrafc"
          target="_blank"
          class="uppercase font-bold text-lg"
        >
          about the author
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
