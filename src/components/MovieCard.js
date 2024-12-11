import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl, formatYear } from '../utils/helpers';
import '../css/MovieCard.scss';
import '../css/Loading.scss';

const MovieCard = ({ movie }) => (
    <div className="movie-card">
        <Link to={`/movie/${movie.id}`}>
            <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="movie-card__image"
            />
            <div className="movie-card__content">
                <h3 className="movie-card__title truncate">{movie.title}</h3>
                <p className="movie-card__year">{formatYear(movie.release_date)}</p>
                <div className="movie-card__rating">
                    <span className="star-icon">★</span>
                    <span className="rating-value">{movie.vote_average.toFixed(1)}</span>
                </div>
            </div>
        </Link>
    </div>
);

export default MovieCard;
