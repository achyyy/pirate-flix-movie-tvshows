// =============================
// PIRATEFLIX — TMDB API HELPERS
// =============================

async function tmdbFetch(endpoint, params = {}) {
    const url = new URL(`${TMDB_BASE}${endpoint}`);
    url.searchParams.set('api_key', TMDB_API_KEY);
    url.searchParams.set('language', 'en-US');
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
    return res.json();
}

const TMDB = {
    // Trending all (movies + TV)
    trending: () => tmdbFetch('/trending/all/week'),
    // Now playing movies
    nowPlaying: () => tmdbFetch('/movie/now_playing'),
    // Top rated
    topRated: () => tmdbFetch('/movie/top_rated'),
    // Popular TV
    popularTV: () => tmdbFetch('/tv/popular'),
    // Action movies (genre 28)
    action: () => tmdbFetch('/discover/movie', { with_genres: '28', sort_by: 'popularity.desc' }),
    // Thriller movies (genre 53)
    thriller: () => tmdbFetch('/discover/movie', { with_genres: '53', sort_by: 'popularity.desc' }),
    // Movie details
    movieDetails: (id) => tmdbFetch(`/movie/${id}`, { append_to_response: 'videos,credits' }),
    // TV details
    tvDetails: (id) => tmdbFetch(`/tv/${id}`, { append_to_response: 'videos,credits' }),
    // Image URL helpers
    poster: (path, size = 'w342') => path ? `${TMDB_IMG}/${size}${path}` : 'img/no-poster.svg',
    backdrop: (path, size = 'original') => path ? `${TMDB_IMG}/${size}${path}` : '',
};
