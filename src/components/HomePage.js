// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { movieService } from '../service/movieService';
import '../css/HomePage.scss';
import '../css/Loading.scss';

const HomePage = () => {
    const [timeWindow, setTimeWindow] = useState('day');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                setLoading(true);
                const data = await movieService.getTrending(timeWindow);
                if (data.results) {
                    setMovies(data.results);
                } else {
                    setError('No movies found');
                }
            } catch (err) {
                setError('Failed to fetch movies');
                console.error('Error fetching movies:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingMovies();
    }, [timeWindow]);

    return (
        <>
            {loading && (
                <div className="loading-bar">
                </div>
            )}
            {error ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="bg-red-50 p-6 rounded-lg shadow-lg">
                        <p className="text-red-500 font-medium text-lg">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            ) : (
                <div className="homepage-container">
                    <div className="homepage-header">
                        <h1>Trending Movies</h1>
                    </div>
                    <div className="time-window-buttons">
                        <button
                            onClick={() => setTimeWindow('day')}
                            className={timeWindow === 'day' ? 'active' : ''}
                            disabled={loading}
                        >
                            Today
                        </button>
                        <button
                            onClick={() => setTimeWindow('week')}
                            className={timeWindow === 'week' ? 'active' : ''}
                            disabled={loading}
                        >
                            This Week
                        </button>
                    </div>
                    <div className="movies-grid">
                        {movies.length > 0 ? (
                            movies.map(movie => (
                                <div key={movie.id} className="movie-card">
                                    <MovieCard movie={movie} />
                                </div>
                            ))
                        ) : (
                            <div className="no-movies">No movies found</div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default HomePage;