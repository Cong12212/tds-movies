// import React, { useEffect, useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { movieService } from '../service/movieService';
// import { getImageUrl, formatYear } from '../utils/helpers';

// const SearchPage = () => {
//     const [searchParams] = useSearchParams();
//     const [results, setResults] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const query = searchParams.get('q');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const searchMovies = async () => {
//             if (!query) return;

//             try {
//                 setLoading(true);
//                 const data = await movieService.searchMovies(query);
//                 setResults(data.results || []);
//             } catch (error) {
//                 console.error('Search error:', error);
//                 setResults([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         searchMovies();
//     }, [query]);

//     const handleMovieClick = (movieId) => {
//         navigate(`/movie/${movieId}`);
//     };

//     const renderMovieImage = (movie) => {
//         if (movie.poster_path) {
//             return (
//                 <img
//                     src={getImageUrl(movie.poster_path, 'SMALL')}
//                     alt={movie.title}
//                     className="w-12 h-18 object-cover rounded"
//                 />
//             );
//         }

//         return (
//             <div className="w-12 h-18 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
//                 No Image
//             </div>
//         );
//     };

//     if (loading) return (
//         <div className="loading-bar">
//             <div className="bar"></div>
//         </div>
//     );

//     return (
//         // Wrapper div với background gradient tràn màn hình
//         <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black">
//             {/* Container cho list với max-width */}
//             <div className="max-w-7xl mx-auto p-4">
//                 <div className="space-y-4">
//                     {results.map(movie => (
//                         <div
//                             key={movie.id}
//                             onClick={() => handleMovieClick(movie.id)}
//                             className="flex items-center p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow 
//                                      border border-gray-100 cursor-pointer hover:bg-white 
//                                      transition-colors"
//                         >
//                             {renderMovieImage(movie)}
//                             <div className="ml-4 flex-1">
//                                 <div className="font-semibold text-gray-900 text-lg">
//                                     {movie.title}
//                                 </div>
//                                 <div className="text-sm text-gray-500 mt-1">
//                                     {formatYear(movie.release_date)}
//                                 </div>
//                                 {movie.vote_average > 0 && (
//                                     <div className="flex items-center text-sm text-gray-500 mt-1">
//                                         <span className="text-yellow-400 mr-1">★</span>
//                                         {movie.vote_average.toFixed(1)}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                     {results.length === 0 && !loading && (
//                         <div className="text-center text-white">
//                             No results found for "{query}"
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SearchPage;

import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { movieService } from '../service/movieService';
import { getImageUrl, formatYear } from '../utils/helpers';
import '../css/Loading.scss';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const query = searchParams.get('q');
    const navigate = useNavigate();

    useEffect(() => {
        const searchMovies = async () => {
            if (!query) return;

            try {
                setLoading(true);
                const data = await movieService.searchMovies(query);
                setResults(data.results || []);
            } catch (error) {
                console.error('Search error:', error);
                // Không set results thành mảng rỗng khi lỗi để giữ kết quả cũ
                // setResults([]);
            } finally {
                setLoading(false);
            }
        };

        searchMovies();
    }, [query]);

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    const renderMovieImage = (movie) => {
        if (movie.poster_path) {
            return (
                <img
                    src={getImageUrl(movie.poster_path, 'SMALL')}
                    alt={movie.title}
                    className="w-12 h-18 object-cover rounded"
                />
            );
        }

        return (
            <div className="w-12 h-18 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                No Image
            </div>
        );
    };

    return (
        <>
            {loading && (
                <div className="loading-bar">

                </div>
            )}
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black">
                <div className="max-w-7xl mx-auto p-4">
                    <div className="space-y-4">
                        {results.map(movie => (
                            <div
                                key={movie.id}
                                onClick={() => handleMovieClick(movie.id)}
                                className="flex items-center p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow 
                                         border border-gray-100 cursor-pointer hover:bg-white 
                                         transition-colors"
                            >
                                {renderMovieImage(movie)}
                                <div className="ml-4 flex-1">
                                    <div className="font-semibold text-gray-900 text-lg">
                                        {movie.title}
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        {formatYear(movie.release_date)}
                                    </div>
                                    {movie.vote_average > 0 && (
                                        <div className="flex items-center text-sm text-gray-500 mt-1">
                                            <span className="text-yellow-400 mr-1">★</span>
                                            {movie.vote_average.toFixed(1)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {results.length === 0 && !loading && (
                            <div className="text-center text-white">
                                No results found for "{query}"
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;