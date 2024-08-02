import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role !== "chef") {
      return navigateTo("/");
    }
  }
});
