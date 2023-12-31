import type {
  Media,
  MediaType,
  PageResult,
  QueryItem,
  Movie,
  Person,
} from "~/types";

const customizePics = (
  src: string
): string => `https://image.tmdb.org/t/p/original/${src}
`;

const formatNumber = (number: number): string => {
  return new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 2 })
    .format(number)
    .slice(0, 3);
};

const formatTime = function (time: string): string {
  const hours = Math.floor(+time / 60) || "";
  const mins = Math.floor(+time % 60) || "";
  // 3h 26min
  if (hours || mins) return `${hours}h ${mins}min`;
  else return "";
};

const formatCurrency = (num: number) => {
  if (!num) return "N/A";
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(num);
};

const formaDate = (date: Date) => {
  if (!date) return date;
  const oldDate = new Date(date);
  return new Intl.DateTimeFormat("en-US").format(oldDate);
};

async function getPopular(type: MediaType): Promise<PageResult<Media>> {
  return await $fetch(`/api/${type}/popular`);
}

async function getTopRated(type: MediaType): Promise<PageResult<Media>> {
  return await $fetch(`/api/${type}/top_rated`);
}

async function getUpcoming(type: MediaType): Promise<PageResult<Media>> {
  return await $fetch(`/api/${type}/upcoming`);
}

async function getNowPlaying(type: MediaType): Promise<PageResult<Media>> {
  return await $fetch(`/api/${type}/now_playing`);
}

async function getAiringToday(type: MediaType): Promise<PageResult<Media>> {
  return await $fetch(`/api/${type}/airing_today`);
}

async function getSearchMedia(
  keyword: string,
  page = 1
): Promise<PageResult<Media>> {
  return await $fetch(`/api/search/multi?query=${keyword}&page=${page}`);
}

async function getMediaById(type: MediaType, id: string): Promise<Movie> {
  return await $fetch(`/api/${type}/${id}`, {
    params: {
      // get extra data along with request
      append_to_response:
        "videos,credits,images,external_ids,release_dates,combined_credits",
    },
  });
}

async function getRecommendations({
  type,
  id,
}: {
  type: MediaType;
  id: string;
}) {
  return await $fetch(`/api/${type}/${id}/recommendations`);
}

async function getPerson(id: string | string[]): Promise<Person> {
  return await $fetch(`/api/person/${id}`, {
    params: {
      append_to_response:
        "videos,credits,images,external_ids,release_dates,combined_credits",
    },
  });
}

async function fetchTMDB(
  { type, query }: { type: MediaType; query: string | string[] },
  page = 1
): Promise<PageResult<Media>> {
  return await $fetch(`/api/${type}/${query}`, {
    params: {
      page,
    },
  });
}
async function getMediaByGenre({
  type,
  id,
  page = 1,
}: QueryItem): Promise<PageResult<Media>> {
  return await $fetch(`/api/${type}/${id}/similar`, {
    params: {
      page,
    },
  });
}

export {
  getPopular,
  getMediaById,
  customizePics,
  formatNumber,
  formatTime,
  getTopRated,
  getUpcoming,
  getNowPlaying,
  getAiringToday,
  getSearchMedia,
  formatCurrency,
  formaDate,
  getRecommendations,
  fetchTMDB,
  getPerson,
  getMediaByGenre,
};
