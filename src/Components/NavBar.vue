<script setup>
import { onMounted, ref } from "vue";

const isDark = ref(false);
const mobileMenuOpen = ref(false);

function toggleTheme() {
  const updatedValue = !isDark.value;
  isDark.value = updatedValue;
  localStorage.setItem("theme", updatedValue ? "dark" : "light");
  document.documentElement.classList.toggle("dark", updatedValue);
}

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  isDark.value = savedTheme ? savedTheme === "dark" : prefersDark;
  document.documentElement.classList.toggle("dark", isDark.value);
});
</script>

<template>
  <nav class="app-container flex items-center justify-between py-4">
    <a
      href="#"
      class="flex items-center gap-3"
      aria-label="SIT Event Compass Home"
    >
      <span class="brand-mark">SIT</span>
      <div>
        <p
          class="text-sm font-bold uppercase tracking-[0.28em] text-sky-600 dark:text-sky-300"
        >
          Event Compass
        </p>
        <p class="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
          Vue + Tailwind Performance Lab
        </p>
      </div>
    </a>

    <div class="hidden items-center gap-2 md:flex">
      <a class="nav-link" href="#events">Events</a>
      <a class="nav-link" href="#performance">Optimization</a>
      <a class="nav-link" href="#heuristics">Heuristics</a>
      <button class="btn-ghost" type="button" @click="toggleTheme">
        {{ isDark ? "Light Mode" : "Dark Mode" }}
      </button>
    </div>

    <button
      class="btn-ghost md:hidden"
      type="button"
      :aria-expanded="mobileMenuOpen"
      aria-controls="mobile-menu"
      @click="mobileMenuOpen = !mobileMenuOpen"
    >
      Menu
    </button>
  </nav>
  <div
    v-if="mobileMenuOpen"
    id="mobile-menu"
    class="border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 md:hidden"
  >
    <div class="grid gap-2">
      <a class="nav-link" href="#events" @click="mobileMenuOpen = false"
        >Events</a
      >
      <a class="nav-link" href="#performance" @click="mobileMenuOpen = false"
        >Optimization</a
      >
      <a class="nav-link" href="#heuristics" @click="mobileMenuOpen = false"
        >Heuristics</a
      >
      <button class="btn-primary" type="button" @click="toggleTheme">
        {{ isDark ? "Switch to Light Mode" : "Switch to Dark Mode" }}
      </button>
    </div>
  </div>
</template>
