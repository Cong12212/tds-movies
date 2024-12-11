import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchComponent = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const searchMovies = async (searchQuery) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${encodeURIComponent(searchQuery)}`
            );
            const data = await response.json();
            setResults(data.results);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);

        // Debounce search
        const timeoutId = setTimeout(() => {
            searchMovies(value);
        }, 500);

        return () => clearTimeout(timeoutId);
    };

    return (
        <div style={{ padding: '20px', position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={handleSearch}
                style={{
                    width: '100%',
                    padding: '10px 15px',
                    fontSize: '1rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
            />

            {loading && (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    Searching...
                </div>
            )}

            {results.length > 0 && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    marginTop: '10px',
                    zIndex: 1000
                }}>
                    {results.map(movie => (
                        <div
                            key={movie.id}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                            style={{
                                padding: '10px',
                                borderBottom: '1px solid #eee',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                ':hover': {
                                    backgroundColor: '#f5f5f5'
                                }
                            }}
                        >
                            {movie.poster_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                    alt={movie.title}
                                    style={{
                                        width: '46px',
                                        height: '69px',
                                        objectFit: 'cover',
                                        borderRadius: '4px'
                                    }}
                                />
                            ) : (
                                <div style={{
                                    width: '46px',
                                    height: '69px',
                                    backgroundColor: '#eee',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.8rem'
                                }}>
                                    No Image
                                </div>
                            )}
                            <div style={{ marginLeft: '10px' }}>
                                <div style={{ fontWeight: 'bold' }}>{movie.title}</div>
                                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                    {movie.release_date ?
                                        new Date(movie.release_date).getFullYear() :
                                        'Release date unknown'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchComponent;