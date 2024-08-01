import { defineStore } from "pinia";

export const useSearchResultsStore = defineStore("searchResults", {
  state: () => ({
    results: [] as any[],
  }),
  actions: {
    setSearchResults(results: any[]) {
      this.results = results;
    },
  },
});
