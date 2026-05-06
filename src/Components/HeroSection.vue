<script setup>
import { computed } from "vue";

const props = defineProps({ events: { type: Array } });

const totalPoints = computed(() =>
  props.events.reduce((sum, event) => sum + event.points, 0),
);
const featuredCount = computed(
  () => props.events.filter((event) => event.featured).length,
);
</script>
<template>
  <div
    class="app-container grid items-center gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-24"
  >
    <div>
      <p class="eyebrow">Teaching-ready web application</p>
      <h1
        class="mt-4 max-w-4xl text-4xl font-black tracking-tight text-slate-950 dark:text-white md:text-6xl"
      >
        Build, inspect, and optimize a Vue.js + Tailwind CSS event portal.
      </h1>
      <p
        class="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300"
      >
        This app intentionally includes a large CSS file, design tokens,
        reusable-style patterns, dark mode, filters, modal details, toast
        feedback, and responsive layout behavior.
      </p>

      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <a class="btn-primary" href="#events">Explore Events</a>
        <a class="btn-secondary" href="#performance">View Optimization Tasks</a>
      </div>
    </div>

    <aside class="glass-panel">
      <p
        class="text-sm font-semibold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-300"
      >
        Dashboard
      </p>
      <div class="mt-6 grid gap-4">
        <div class="stat-card">
          <span class="stat-number">{{ events.length }}</span>
          <span class="stat-label">Total events</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">{{ featuredCount }}</span>
          <span class="stat-label">Featured activities</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">{{ totalPoints }}</span>
          <span class="stat-label">Available learning points</span>
        </div>
      </div>
    </aside>
  </div>
</template>
