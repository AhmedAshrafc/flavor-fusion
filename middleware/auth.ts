function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem("user"));
}

export default defineNuxtRouteMiddleware((to, from) => {
  const authRequired = ["/profile"];
  const guestRequired = ["/entrance", "/join"];

  const authenticated = isAuthenticated();

  if (authRequired.includes(to.path) && !authenticated) {
    return navigateTo("/");
  }

  if (guestRequired.includes(to.path) && authenticated) {
    return navigateTo("/");
  }
});
