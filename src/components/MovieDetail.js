import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY`
                );
                const data = await response.json();
                setMovie(data);
            } catch (err) {
                setError('Failed to fetch movie details');
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetail();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!movie) return null;

    return (
        <div style={{
            padding: '20px',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                '@media (min-width: 768px)': {
                    flexDirection: 'row',
                }
            }}>
                <div style={{ flex: '0 0 300px' }}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        style={{
                            width: '100%',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    />
                </div>
                <div style={{ flex: 1, padding: '20px' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>{movie.title}</h1>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px'
                    }}>
                        <span style={{ color: '#ffd700', marginRight: '5px' }}>★</span>
                        <span>{movie.vote_average.toFixed(1)}</span>
                        <span style={{ margin: '0 10px' }}>•</span>
                        <span>{new Date(movie.release_date).getFullYear()}</span>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        {movie.genres.map(genre => (
                            <span
                                key={genre.id}
                                style={{
                                    display: 'inline-block',
                                    backgroundColor: '#f0f0f0',
                                    padding: '5px 10px',
                                    borderRadius: '15px',
                                    marginRight: '10px',
                                    marginBottom: '10px',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Overview</h2>
                    <p style={{
                        color: '#666',
                        lineHeight: '1.6',
                        marginBottom: '20px'
                    }}>
                        {movie.overview}
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '20px'
                    }}>
                        <div>
                            <h3 style={{ fontWeight: 'bold' }}>Release Date</h3>
                            <p>{new Date(movie.release_date).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <h3 style={{ fontWeight: 'bold' }}>Runtime</h3>
                            <p>{movie.runtime} minutes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;