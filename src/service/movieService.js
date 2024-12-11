import { apiClient } from './API';

export const movieService = {
    getTrending: (timeWindow = 'day') => {
        return apiClient.get(`/trending/movie/${timeWindow}?language=en-US`);
    },

    getMovieDetails: (movieId) => {
        return apiClient.get(`/movie/${movieId}?language=en-US`);
    },

    searchMovies: (query) => {
        return apiClient.get(
            `/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`
        );
    }
};