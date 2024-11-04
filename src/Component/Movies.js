import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Eye, Heart, Star, Film as FilmIcon } from 'lucide-react';

// TMDB API configuration
const API_KEY = '6bb37637f1e840b541be92ac42d9aab4';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const FilmsPage = () => {
  const [popularFilms, setPopularFilms] = useState([]);
  const [trendingFilms, setTrendingFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Fetch popular films
  useEffect(() => {
    const fetchPopularFilms = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPopularFilms(data.results.slice(0, 10));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch popular films: ' + err.message);
        setIsLoading(false);
      }
    };

    const fetchTrendingFilms = async () => {
      try {
        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTrendingFilms(data.results.slice(0, 10));
      } catch (err) {
        console.error('Failed to fetch trending films:', err);
      }
    };

    fetchPopularFilms();
    fetchTrendingFilms();
  }, []);

  // Search functionality
  useEffect(() => {
    const searchMovies = async () => {
      if (!searchQuery) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSearchResults(data.results.slice(0, 5));
      } catch (err) {
        console.error('Search failed:', err);
      }
    };

    const debounceTimer = setTimeout(searchMovies, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Format number to K/M format
  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black text-gray-100 px-8 py-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium text-red-400 mb-2">Error</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center space-x-6">
          <span className="text-sm font-medium text-gray-400">Browse</span>
          <div className="flex gap-3">
            {['Year', 'Rating', 'Popular', 'Genre'].map((item) => (
              <button 
                key={item}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-300 
                         hover:text-white transition-colors rounded-md hover:bg-gray-800"
              >
                {item}
                <ChevronDown size={14} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>
        
        <div className="relative w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search films..."
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 
                     text-sm placeholder-gray-500 focus:outline-none focus:ring-2 
                     focus:ring-blue-500/40 focus:border-transparent"
          />
          <Search className="absolute right-3 top-3 text-gray-500" size={16} />
          
          {/* Search Results Dropdown */}
          {searchResults.length > 0 && searchQuery && (
            <div className="absolute mt-2 w-full bg-gray-900 border border-gray-800 rounded-lg 
                          shadow-xl overflow-hidden z-50">
              {searchResults.map((movie) => (
                <div 
                  key={movie.id}
                  className="p-3 hover:bg-gray-800 cursor-pointer flex items-center gap-3"
                >
                  {movie.poster_path ? (
                    <img
                      src={`${IMAGE_BASE_URL}/w92${movie.poster_path}`}
                      alt={movie.title}
                      className="w-10 h-14 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-14 bg-gray-800 rounded flex items-center justify-center">
                      <FilmIcon size={20} className="text-gray-600" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium">{movie.title}</h4>
                    <p className="text-sm text-gray-400">
                      {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Popular Films */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Popular this week</h2>
          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            View all
          </button>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="bg-gray-800 h-[400px] rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex space-x-6 overflow-x-auto">
            {popularFilms.map((film) => (
              <div 
                key={film.id}
                className="group relative rounded-lg overflow-hidden 
                         transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              >
                <img
                  src={`${IMAGE_BASE_URL}/w500${film.poster_path}`}
                  alt={film.title}
                  className="w-[250px] h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 w-full p-4">
                    <h3 className="text-lg font-medium mb-3">{film.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <span className="flex items-center gap-1.5">
                        <Eye size={14} />
                        {formatNumber(film.popularity)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Star size={14} />
                        {film.vote_average.toFixed(1)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Heart size={14} />
                        {formatNumber(film.vote_count)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Trending Films */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Trending now</h2>
          <span className="text-sm text-gray-500">Updated hourly</span>
        </div>
        
        <div className="flex justify-center space-x-4 overflow-x-auto">
          {trendingFilms.map((film) => (
            <div 
              key={film.id}
              className="relative overflow-hidden rounded-md transition-transform 
                       duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              <img
                src={`${IMAGE_BASE_URL}/w300${film.poster_path}`}
                alt={film.title}
                className="w-[200px] h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 
                           group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 w-full p-4">
                  <h3 className="text-lg font-medium mb-3">{film.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <span className="flex items-center gap-1.5">
                      <Eye size={14} />
                      {formatNumber(film.popularity)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Star size={14} />
                      {film.vote_average.toFixed(1)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Heart size={14} />
                      {formatNumber(film.vote_count)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FilmsPage;
