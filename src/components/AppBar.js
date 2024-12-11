import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/AppBar.scss'
import logoImage from '../assets/logo.png';
import '../css/Loading.scss';

const AppBar = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
            setQuery('');
        }
    };

    return (
        <div className="AppBar-container">
            <div className="content-wrapper">
                {/* Logo */}
                <Link to="/" className="logo-link">
                    <img src={logoImage} alt="Logo" />
                </Link>
                <p className='p-appbar'>Welcome.
                    Millions of movies, TV shows and people to discover. Explore now.</p>
                {/* Search Container */}
                <div className="search-form-container">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Search for a movie, ..."
                            value={query}
                            onChange={handleSearch}
                        />
                        <button type="submit">
                            Search
                        </button>
                        {loading && (
                            <div className="loading-spinner">
                                <div className="spinner"></div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AppBar;