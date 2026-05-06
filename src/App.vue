<script setup>
import { computed, onMounted, ref } from "vue";
import NavBar from "./Components/NavBar.vue";
import HeroSection from "./Components/HeroSection.vue";
import EventsSection from "./Components/EventsSection.vue";

const events = [
  {
    id: 1,
    title: "UX/UI Design Bootcamp",
    category: "Workshop",
    date: "2026-06-12",
    time: "09:00–12:00",
    location: "LX11/3",
    level: "Beginner",
    points: 3,
    featured: true,
    description:
      "Learn usability heuristics, wireframing, visual hierarchy, and rapid prototyping with Figma.",
  },
  {
    id: 2,
    title: "Vue + Tailwind CSS Clinic",
    category: "Clinic",
    date: "2026-06-18",
    time: "13:30–16:30",
    location: "i-Lab",
    level: "Intermediate",
    points: 2,
    featured: true,
    description:
      "Hands-on support for building reusable components, responsive layouts, and dark mode.",
  },
  {
    id: 3,
    title: "AI for Web Experience Seminar",
    category: "Seminar",
    date: "2026-06-24",
    time: "10:00–11:30",
    location: "LX12/1",
    level: "General",
    points: 1,
    featured: false,
    description:
      "Explore how AI can support content personalization, accessibility, and student services.",
  },
  {
    id: 4,
    title: "Hackathon Staff Meeting",
    category: "Meeting",
    date: "2026-07-02",
    time: "15:00–16:30",
    location: "Online",
    level: "Staff",
    points: 0,
    featured: false,
    description:
      "Prepare roles, judging criteria, communication workflow, and technical support plans.",
  },
  {
    id: 5,
    title: "International Student Orientation",
    category: "Orientation",
    date: "2026-07-09",
    time: "09:00–11:00",
    location: "Main Hall",
    level: "New Students",
    points: 1,
    featured: true,
    description:
      "Introduce academic programs, scholarships, exchange opportunities, student life, and campus services.",
  },
  {
    id: 6,
    title: "Build Optimization Lab",
    category: "Workshop",
    date: "2026-07-16",
    time: "13:30–16:30",
    location: "LX10/4",
    level: "Intermediate",
    points: 2,
    featured: false,
    description:
      "Compare development CSS and production CSS, analyze asset sizes, and improve frontend performance.",
  },
];

const selectedEvent = ref(null);
const toastMessage = ref("");
const isDark = ref(false);

function openEvent(event) {
  selectedEvent.value = event;
}

function closeModal() {
  selectedEvent.value = null;
}

function showToast(message) {
  toastMessage.value = message;
  setTimeout(() => {
    toastMessage.value = "";
  }, 2500);
}

function registerEvent(event) {
  showToast(`Registered interest for "${event.title}".`);
  closeModal();
}
</script>

<template>
  <div
    class="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white"
  >
    <header
      class="sticky top-0 z-40 border-b border-white/10 bg-white/80 backdrop-blur-xl dark:bg-slate-950/80"
    >
      <NavBar />
    </header>

    <main>
      <section class="hero-section">
        <HeroSection :events="events" />
      </section>

      <section id="events" class="app-container py-16">
        <EventsSection :events="events" />
      </section>

      <section id="performance" class="bg-white py-16 dark:bg-slate-900/50">
        <div class="app-container">
          <div class="section-heading">
            <p class="eyebrow">Build optimization</p>
            <h2>Use this app as a performance experiment</h2>
            <p>
              The CSS is intentionally larger than necessary. Students can
              inspect, build, compare, and refactor.
            </p>
          </div>

          <div class="grid gap-5 lg:grid-cols-3">
            <div class="learning-card">
              <span class="step-number">01</span>
              <h3>Inspect CSS</h3>
              <p>
                Open <code>src/style.css</code> and identify custom classes,
                repeated patterns, and teaching-only utilities.
              </p>
            </div>
            <div class="learning-card">
              <span class="step-number">02</span>
              <h3>Build production</h3>
              <p>
                Run <code>npm run build</code> and compare the production assets
                with the development experience.
              </p>
            </div>
            <div class="learning-card">
              <span class="step-number">03</span>
              <h3>Refactor</h3>
              <p>
                Move repeated UI patterns into reusable Vue components or
                cleaner Tailwind component classes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="heuristics" class="app-container py-16">
        <div class="section-heading">
          <p class="eyebrow">UX explanation</p>
          <h2>Usability heuristics applied</h2>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
          <div class="heuristic-card">
            <h3>Visibility of system status</h3>
            <p>
              Toast feedback confirms registration interest, while filters
              immediately update the event list.
            </p>
          </div>
          <div class="heuristic-card">
            <h3>Recognition rather than recall</h3>
            <p>
              Category filters, badges, dates, and locations make information
              visible without requiring memorization.
            </p>
          </div>
          <div class="heuristic-card">
            <h3>User control and freedom</h3>
            <p>
              Students can close the modal, reset filters, switch theme modes,
              and navigate with a responsive menu.
            </p>
          </div>
          <div class="heuristic-card">
            <h3>Aesthetic and minimalist design</h3>
            <p>
              Cards, spacing, hierarchy, and consistent tokens reduce visual
              clutter while keeping key details readable.
            </p>
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t border-slate-200 py-8 dark:border-slate-800">
      <div
        class="app-container flex flex-col justify-between gap-3 text-sm text-slate-500 dark:text-slate-400 md:flex-row"
      >
        <p>© 2026 SIT Event Compass</p>
        <p>
          Built with Vue.js, Tailwind CSS, and intentional CSS bloat for
          teaching optimization.
        </p>
      </div>
    </footer>

    <div
      v-if="selectedEvent"
      class="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
      @click.self="closeModal"
    >
      <div class="modal-card">
        <button
          class="modal-close"
          type="button"
          aria-label="Close event details"
          @click="closeModal"
        >
          ×
        </button>
        <span class="badge">{{ selectedEvent.category }}</span>
        <h2 id="event-modal-title" class="mt-4 text-2xl font-black">
          {{ selectedEvent.title }}
        </h2>
        <p class="mt-4 text-slate-600 dark:text-slate-300">
          {{ selectedEvent.description }}
        </p>

        <div
          class="mt-6 grid gap-3 rounded-2xl bg-slate-100 p-4 text-sm dark:bg-slate-800"
        >
          <p><strong>Date:</strong> {{ selectedEvent.date }}</p>
          <p><strong>Time:</strong> {{ selectedEvent.time }}</p>
          <p><strong>Location:</strong> {{ selectedEvent.location }}</p>
          <p><strong>Level:</strong> {{ selectedEvent.level }}</p>
          <p><strong>Learning points:</strong> {{ selectedEvent.points }}</p>
        </div>

        <div class="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            class="btn-primary flex-1"
            type="button"
            @click="registerEvent(selectedEvent)"
          >
            Register Interest
          </button>
          <button
            class="btn-secondary flex-1"
            type="button"
            @click="closeModal"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <div v-if="toastMessage" class="toast" role="status">
      {{ toastMessage }}
    </div>
  </div>
</template>
