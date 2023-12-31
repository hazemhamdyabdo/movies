<script setup lang="ts">
import {
  formatCurrency,
  customizePics,
  formatTime,
  formaDate,
} from "~/composables/tmdb";

import { languagesShortcuts } from "~/utils/languages";

const props = defineProps(["movie"]);
const externalIds = computed(() => ({
  ...props.movie.external_ids,
  homepage: props.movie.homepage,
}));

const directorName = (arr: {
  crew?: [];
}): { job?: string; name?: string; id: number } | undefined => {
  const { crew } = arr;
  const directorName: { job?: string; name?: string; id: number } | undefined =
    crew?.find((e: { job?: string; name: string }) => e.job === "Director");

  return directorName;
};

const getCompanies = (companys: []) => {
  return companys.map((e: { name: string }) => e.name).join(", ");
};
</script>

<template>
  <div flex gap-12 font-base>
    <div flex-shrink-0 class="img--wrapper">
      <NuxtImg :src="customizePics(movie.poster_path)" />
    </div>
    <div flex="~ col justify-center" gap-10 class="continer">
      <h3 class="text-4xl text-white font-semibold">Storyline</h3>
      <p class="text-white text-lg">{{ movie.overview }}</p>
      <ul grid="~ cols-2" class="max-[900px]:grid-cols-1" font-500>
        <li v-show="formaDate(movie.release_date)">
          <div flex items-center gap-4 mb-5>
            <p>Released</p>
            <p>{{ formaDate(movie.release_date) }}</p>
          </div>
        </li>
        <li v-show="formatTime(movie.runtime)">
          <div flex items-center gap-4 mb-5>
            <p>Runtime</p>
            <p>{{ formatTime(movie.runtime) }}</p>
          </div>
        </li>
        <li v-show="directorName(movie.credits)">
          <div flex items-center gap-4 mb-5>
            <p>Directo</p>
            <NuxtLink
              v-show="directorName(movie.credits)?.name"
              :to="`/person/${directorName(movie.credits)?.id}`"
              >{{ directorName(movie.credits)?.name }}</NuxtLink
            >
          </div>
        </li>
        <li v-show="movie.budget">
          <div flex items-center gap-4 mb-5>
            <p>Budget</p>
            <p>{{ formatCurrency(movie.budget) }}</p>
          </div>
        </li>
        <li v-show="movie.revenue">
          <div flex items-center gap-4 mb-5>
            <p>Revenue</p>
            <p>{{ formatCurrency(movie.revenue) }}</p>
          </div>
        </li>
        <li>
          <div flex items-center gap-4 mb-5>
            <p>Genre</p>
            <ul flex gap-2 class="">
              <li v-for="gen in movie.genres" :key="gen.name">
                <NuxtLink :to="`/genre/${gen.id}/${$route.params.type}`">{{
                  gen.name
                }}</NuxtLink>
              </li>
            </ul>
          </div>
        </li>
        <li v-show="movie.status">
          <div flex items-center gap-4 mb-5>
            <p>Status</p>
            <p>{{ movie.status }}</p>
          </div>
        </li>
        <li>
          <div flex="~ items-center" gap-4>
            <p>Production</p>
            <p class="w-[400px]">
              {{ getCompanies(movie.production_companies) }}
            </p>
          </div>
        </li>
        <li>
          <div flex items-center gap-4 mb-5>
            <p>Language</p>
            <p>
              {{ languagesShortcuts[movie.original_language] }}
            </p>
          </div>
        </li>
      </ul>
      <div mt--7>
        <MediaExternalLinks :links="externalIds" />
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  background-color: #272727;
  padding: 0.1rem 0.2rem;
  font-size: small;
  font-style: italic;
  border-radius: 4px;
}
img {
  width: 22rem;
  border: 6px solid rgb(53, 53, 53);
}

li p:nth-child(1) {
  color: rgb(230, 224, 224);
}

@media only screen and (max-width: 650px) {
  .continer {
    gap: 1.5rem;

    & h3 {
      font-size: 1.5rem;
    }

    & p {
      font-size: 1rem;
    }
  }
  .img--wrapper {
    display: none;
    & img {
      height: 100%;
    }
  }
}
</style>
