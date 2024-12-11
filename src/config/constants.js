export const API_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
    BEARER_TOKEN: process.env.REACT_APP_TMDB_TOKEN,
    POSTER_SIZES: {
        SMALL: 'w92',
        MEDIUM: 'w500'
    }
};