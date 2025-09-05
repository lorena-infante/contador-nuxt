export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    nuxtApp.hooks.hook("app:mounted", () => {
      const store = nuxtApp.$store as any;
      store.dispatch("loadFromLocalStorage");
      store.dispatch("loadFiltersFromSessionStorage");
    });
  }
});
