import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { movieService } from '../service/movieService';
import { getImageUrl, formatYear, formatDate } from '../utils/helpers';
import '../css/MovieDetail.scss';
import '../css/Loading.scss';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                setLoading(true);
                const data = await movieService.getMovieDetails(id);
                setMovie(data);
            } catch (err) {
                setError('Failed to fetch movie details');
                console.error('Error fetching movie details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetail();
    }, [id]);

    if (loading) return (
        <div className="loading-bar">
            <div className="bar"></div>
        </div>
    );

    if (error) return (
        <div className="text-red-500 text-center p-4">
            {error}
        </div>
    );

    if (!movie) return null;

    const containerStyle = {
        '--poster-image': `url(${getImageUrl(movie.poster_path)})`
    };

    return (
        <div className="movie-detail-container" style={containerStyle}>
            <div className="flex flex-col md:flex-row gap-5">
                {/* Poster Section */}
                <div className="poster-section">
                    <img
                        src={getImageUrl(movie.poster_path)}
                        alt={movie.title}
                        className="rounded-lg shadow-md"
                    />
                </div>

                {/* Content Section */}
                <div className="content-section">
                    {/* Title */}
                    <h1>{movie.title}</h1>

                    {/* Rating and Year */}
                    <div className="rating">
                        <span className="star-icon">★</span>
                        <span>{movie.vote_average.toFixed(1)}</span>
                        <span className="mx-2">•</span>
                        <span>{formatYear(movie.release_date)}</span>
                    </div>

                    {/* Genres */}
                    <div className="genres">
                        {movie.genres.map(genre => (
                            <span
                                key={genre.id}
                                className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm mr-2 mb-2"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    {/* Overview */}
                    <div className="overview">
                        <h2 className="text-2xl font-bold mb-2">Overview</h2>
                        <p className="text--600 leading-relaxed">
                            {movie.overview}
                        </p>
                    </div>

                    {/* Additional Details */}
                    <div className="additional-details">
                        <div>
                            <h3>Release Date:</h3>
                        </div>
                        <div> <p>{formatDate(movie.release_date)}</p></div>
                        <div> <h3>Runtime:</h3></div>
                        <div> <p>{movie.runtime} minutes</p></div>
                        {movie.budget > 0 && (<>
                            <div>
                                <h3>Budget:</h3>
                            </div>
                            <div><p>${movie.budget.toLocaleString()}</p></div>
                        </>
                        )}
                        {movie.revenue > 0 && (<>
                            <div>
                                <h3>Revenue:</h3>

                            </div>
                            <div><p>${movie.revenue.toLocaleString()}</p></div>
                        </>
                        )}
                    </div>
                </div>
            </div>
        </div >

    );
};

export default MovieDetail;