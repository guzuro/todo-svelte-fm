import { writable } from "svelte/store";

export  type Theme = "light" | "dark";

const THEME_LOCAL_STORAGE_KEY = "theme"
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)') ? "dark" : "light"

export const getCurrentTheme = () => {
    const html = document.documentElement;
 
    return html.getAttribute("data-theme") as Theme | null;
}

export const themeState = writable(getCurrentTheme() ?? systemTheme)

export const setTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme);

  localStorage.setItem('theme', theme);

  themeState.set(theme)
}

export const toggleTheme = (): Theme => {
    const currentTheme = getCurrentTheme();

     const newTheme: Theme = currentTheme === "dark" ? "light" : "dark";

    setTheme(newTheme)

    return newTheme;
}




export const initTheme = () => {
  const savedTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY) as Theme | null;

  const themeToUse: Theme = savedTheme ?? systemTheme;

  setTheme(themeToUse);
}