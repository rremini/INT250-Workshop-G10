<script setup>
import { computed, ref } from "vue";

const props = defineProps({ events: { type: Array } });

const searchText = ref("");
const categories = [
  "All",
  ...new Set(props.events.map((event) => event.category)),
];
const selectedCategory = ref("All");
const onlyFeatured = ref(false);

const filteredEvents = computed(() => {
  return props.events.filter((event) => {
    const matchesCategory =
      selectedCategory.value === "All" ||
      event.category === selectedCategory.value;

    const query = searchText.value.trim().toLowerCase();
    const matchesSearch =
      !query ||
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query);

    const matchesFeatured = !onlyFeatured.value || event.featured;

    return matchesCategory && matchesSearch && matchesFeatured;
  });
});
</script>
<template>
  <div class="section-heading">
    <p class="eyebrow">Event discovery</p>
    <h2>Find the right activity faster</h2>
    <p>
      Students can search, filter by category, view featured sessions, and open
      a modal for more information.
    </p>
  </div>

  <div class="filter-panel">
    <label class="form-control">
      <span>Search events</span>
      <input
        v-model="searchText"
        class="input-field"
        type="search"
        placeholder="Search by title, location, or description"
      />
    </label>

    <label class="form-control">
      <span>Category</span>
      <select v-model="selectedCategory" class="input-field">
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </label>

    <label class="toggle-row">
      <input v-model="onlyFeatured" type="checkbox" />
      <span>Featured only</span>
    </label>
  </div>

  <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
    <article v-for="event in filteredEvents" :key="event.id" class="event-card">
      <div class="flex items-start justify-between gap-4">
        <span class="badge">{{ event.category }}</span>
        <span v-if="event.featured" class="badge-accent">Featured</span>
      </div>

      <h3 class="mt-5 text-xl font-bold">{{ event.title }}</h3>
      <p
        class="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300"
      >
        {{ event.description }}
      </p>

      <dl class="mt-6 grid gap-3 text-sm">
        <div class="detail-row">
          <dt>Date</dt>
          <dd>{{ event.date }}</dd>
        </div>
        <div class="detail-row">
          <dt>Time</dt>
          <dd>{{ event.time }}</dd>
        </div>
        <div class="detail-row">
          <dt>Location</dt>
          <dd>{{ event.location }}</dd>
        </div>
      </dl>

      <button
        class="btn-primary mt-6 w-full"
        type="button"
        @click="openEvent(event)"
      >
        View Details
      </button>
    </article>
  </div>

  <p v-if="filteredEvents.length === 0" class="empty-state">
    No events match your current filters. Try another keyword or category.
  </p>
</template>
