import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: { name: string; country: string; lat: number; lon: number }) => void;
}

interface CityOption {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CityOption[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Ciudades populares para mostrar cuando no hay búsqueda
  const popularCities = [
    { name: 'Madrid', country: 'ES', lat: 40.4168, lon: -3.7038 },
    { name: 'Barcelona', country: 'ES', lat: 41.3851, lon: 2.1734 },
    { name: 'Buenos Aires', country: 'AR', lat: -34.6118, lon: -58.3960 },
    { name: 'México', country: 'MX', state: 'Ciudad de México', lat: 19.4326, lon: -99.1332 },
    { name: 'Londres', country: 'GB', lat: 51.5074, lon: -0.1278 },
    { name: 'París', country: 'FR', lat: 48.8566, lon: 2.3522 },
    { name: 'Nueva York', country: 'US', state: 'NY', lat: 40.7128, lon: -74.0060 },
    { name: 'Tokio', country: 'JP', lat: 35.6762, lon: 139.6503 },
  ];

  // Función para buscar ciudades usando la API de OpenWeatherMap Geocoding
  const searchCities = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions(popularCities);
      return;
    }

    setIsLoading(true);
    try {
      const API_KEY = '8915335fb46ac458132eaf39d6fb2193'; // Tu API key real
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchQuery)}&limit=5&appid=${API_KEY}`
      );
      
      if (response.ok) {
        const data = await response.json();
        const cities = data.map((city: any) => ({
          name: city.name,
          country: city.country,
          state: city.state,
          lat: city.lat,
          lon: city.lon,
        }));
        setSuggestions(cities);
      } else {
        // Si falla la API, usar sugerencias locales
        const localSuggestions = popularCities.filter(city =>
          city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          city.country.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSuggestions(localSuggestions);
      }
    } catch (error) {
      // En caso de error, mostrar sugerencias locales
      const localSuggestions = popularCities.filter(city =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(localSuggestions);
    } finally {
      setIsLoading(false);
    }
  };

  // Efecto para buscar cuando cambia el query
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (showSuggestions) {
        searchCities(query);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, showSuggestions]);

  // Cerrar sugerencias cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0 && query.trim()) {
      // Si hay sugerencias, toma la primera
      onSearch(suggestions[0]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city: CityOption) => {
    const cityName = city.state ? `${city.name}, ${city.state}` : city.name;
    setQuery(cityName);
    onSearch(city);
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
    if (suggestions.length === 0) {
      setSuggestions(popularCities);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions(popularCities);
  };

  const getCountryFlag = (countryCode: string) => {
    const flags: { [key: string]: string } = {
      'ES': '🇪🇸', 'AR': '🇦🇷', 'MX': '🇲🇽', 'GB': '🇬🇧', 
      'FR': '🇫🇷', 'US': '🇺🇸', 'JP': '🇯🇵', 'DE': '🇩🇪',
      'IT': '🇮🇹', 'BR': '🇧🇷', 'CA': '🇨🇦', 'AU': '🇦🇺'
    };
    return flags[countryCode] || '🌍';
  };

  return (
    <div ref={searchRef} className="relative max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleInputFocus}
            placeholder="Buscar ciudad..."
            className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {/* Sugerencias */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl z-50 max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-white/70">
              Buscando ciudades...
            </div>
          ) : suggestions.length > 0 ? (
            <div className="p-2">
              {!query && (
                <div className="px-3 py-2 text-white/60 text-sm font-medium border-b border-white/10">
                  Ciudades populares
                </div>
              )}
              {suggestions.map((city, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(city)}
                  className="w-full px-3 py-3 text-left hover:bg-white/10 rounded-xl transition-colors duration-200 flex items-center gap-3"
                >
                  <MapPin className="w-4 h-4 text-blue-300 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-white font-medium">
                      {city.name}
                      {city.state && (
                        <span className="text-white/70 ml-1">
                          , {city.state}
                        </span>
                      )}
                    </div>
                    <div className="text-white/60 text-sm flex items-center gap-1">
                      <span>{getCountryFlag(city.country)}</span>
                      <span>{city.country}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-white/70">
              No se encontraron ciudades
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
