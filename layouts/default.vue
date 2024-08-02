<template>
  <div
    class="m-10 border container mx-auto"
    :style="{ borderColor: 'var(--border-color)' }"
  >
    <AppHeader />
    <slot></slot>
    <AppFooter />
    <ScrollTop />
  </div>
</template>
