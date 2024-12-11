// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const MovieCard = ({ movie }) => (
//     <div className="movie-card" style={{
//         width: '200px',
//         margin: '10px',
//         backgroundColor: 'white',
//         borderRadius: '8px',
//         overflow: 'hidden',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//     }}>
//         <Link to={`/movie/${movie.id}`}>
//             <img
//                 src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                 alt={movie.title}
//                 style={{ width: '100%', height: '300px', objectFit: 'cover' }}
//             />
//             <div style={{ padding: '10px' }}>
//                 <h3 style={{
//                     margin: '5px 0',
//                     fontSize: '1rem',
//                     whiteSpace: 'nowrap',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis'
//                 }}>{movie.title}</h3>
//                 <p style={{ color: '#666', fontSize: '0.9rem' }}>
//                     {new Date(movie.release_date).getFullYear()}
//                 </p>
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <span style={{ color: '#ffd700' }}>★</span>
//                     <span style={{ marginLeft: '5px' }}>{movie.vote_average.toFixed(1)}</span>
//                 </div>
//             </div>
//         </Link>
//     </div>
// );

// const HomePage = () => {
//     const [timeWindow, setTimeWindow] = useState('day');
//     const [movies, setMovies] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchTrendingMovies = async () => {
//             try {
//                 setLoading(true);
//                 const response = await fetch(
//                     `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=YOUR_API_KEY`
//                 );
//                 const data = await response.json();
//                 setMovies(data.results);
//             } catch (err) {
//                 setError('Failed to fetch movies');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTrendingMovies();
//     }, [timeWindow]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div style={{ color: 'red' }}>{error}</div>;

//     return (
//         <div style={{ padding: '20px' }}>
//             <div style={{ marginBottom: '20px' }}>
//                 <button
//                     onClick={() => setTimeWindow('day')}
//                     style={{
//                         padding: '8px 16px',
//                         marginRight: '10px',
//                         backgroundColor: timeWindow === 'day' ? '#007bff' : '#f8f9fa',
//                         color: timeWindow === 'day' ? 'white' : 'black',
//                         border: 'none',
//                         borderRadius: '4px',
//                         cursor: 'pointer'
//                     }}
//                 >
//                     Today
//                 </button>
//                 <button
//                     onClick={() => setTimeWindow('week')}
//                     style={{
//                         padding: '8px 16px',
//                         backgroundColor: timeWindow === 'week' ? '#007bff' : '#f8f9fa',
//                         color: timeWindow === 'week' ? 'white' : 'black',
//                         border: 'none',
//                         borderRadius: '4px',
//                         cursor: 'pointer'
//                     }}
//                 >
//                     This Week
//                 </button>
//             </div>

//             <div style={{
//                 display: 'flex',
//                 flexWrap: 'wrap',
//                 justifyContent: 'center'
//             }}>
//                 {movies.map(movie => (
//                     <MovieCard key={movie.id} movie={movie} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default HomePage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => (
    <div className="movie-card" style={{
        width: '200px',
        margin: '10px',
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
        <Link to={`/movie/${movie.id}`}>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
            <div style={{ padding: '10px' }}>
                <h3 style={{
                    margin: '5px 0',
                    fontSize: '1rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>{movie.title}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>
                    {new Date(movie.release_date).getFullYear()}
                </p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#ffd700' }}>★</span>
                    <span style={{ marginLeft: '5px' }}>{movie.vote_average.toFixed(1)}</span>
                </div>
            </div>
        </Link>
    </div>
);

const HomePage = () => {
    const [timeWindow, setTimeWindow] = useState('day');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjQ3YWIyZmYxMDUzNjIzYmRlM2UyYjU4OGQ5MGE3NyIsIm5iZiI6MTczMzgzMjA0OS44NjIwMDAyLCJzdWIiOiI2NzU4MmQ3MTc2ODBiMTE3N2YzYWIxMDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2oDOM17VVvWjLmpze6eY7troVQ3FxtIXquzpL9Ia8kg'; // Thay thế bằng API key của bạn

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=${API_KEY}`
                );
                const data = await response.json();

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
    }, [timeWindow, API_KEY]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={() => setTimeWindow('day')}
                    style={{
                        padding: '8px 16px',
                        marginRight: '10px',
                        backgroundColor: timeWindow === 'day' ? '#007bff' : '#f8f9fa',
                        color: timeWindow === 'day' ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Today
                </button>
                <button
                    onClick={() => setTimeWindow('week')}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: timeWindow === 'week' ? '#007bff' : '#f8f9fa',
                        color: timeWindow === 'week' ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    This Week
                </button>
            </div>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                {movies && movies.length > 0 ? (
                    movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    <div>No movies found</div>
                )}
            </div>
        </div>
    );
};

export default HomePage;