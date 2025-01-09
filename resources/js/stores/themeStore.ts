// import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    lightTheme: "light",
    darkTheme: "forest",
    darkMode: localStorage.getItem('darkMode') ? true : false,
  }),
  getters: {
    getTheme(state): string {
      return state.darkMode ? state.darkTheme : this.lightTheme;
    },
    getDarkMode(state): boolean {
      return state.darkMode;
    },
  },
  actions: {
    changeLightTheme(newTheme: string) {
      this.lightTheme = newTheme;
    },
    changeDarkTheme(newTheme: string) {
      this.darkTheme = newTheme;
    },
    toggleDarkMode(isOn: boolean) {
      this.darkMode = isOn;
      this.darkMode ? localStorage.setItem('darkMode', 'true') : localStorage.removeItem('darkMode');
    },
  },
});
