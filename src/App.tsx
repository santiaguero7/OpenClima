import { useState, useEffect } from 'react';
import { WeatherCard } from './components/WeatherCard';
import { SearchBar } from './components/SearchBar';
import { LoadingSpinner } from './components/LoadingSpinner';
import { WeatherBackground } from './components/WeatherBackground';
import { DateTime } from './components/DateTime';
import { LocationButton } from './components/LocationButton';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [city, setCity] = useState<{ name: string; country: string; lat: number; lon: number } | null>(null);

  const fetchWeather = async (cityData: { name: string; country: string; lat: number; lon: number }) => {
    setLoading(true);
    setError('');
    
    try {
      const API_KEY = '8915335fb46ac458132eaf39d6fb2193';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&appid=${API_KEY}&units=metric&lang=es`
      );
      if (!response.ok) {
        throw new Error('Ciudad no encontrada');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError('No se pudo obtener el clima. Intenta con otra ciudad.');
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener ubicación del usuario
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Obtener nombre de la ciudad usando geocodificación inversa
            const API_KEY = '8915335fb46ac458132eaf39d6fb2193';
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
            );
            
            if (response.ok) {
              const data = await response.json();
              if (data.length > 0) {
                const locationData = {
                  name: data[0].name,
                  country: data[0].country,
                  lat: latitude,
                  lon: longitude
                };
                setCity(locationData);
              }
            } else {
              // Si falla la geocodificación, usar coordenadas directamente
              const locationData = {
                name: 'Tu ubicación',
                country: '',
                lat: latitude,
                lon: longitude
              };
              setCity(locationData);
            }
          } catch (error) {
            console.error('Error al obtener nombre de ubicación:', error);
            // Usar ubicación por defecto si falla
            setCity({ name: 'Madrid', country: 'ES', lat: 40.4168, lon: -3.7038 });
          }
        },
        (error) => {
          console.error('Error de geolocalización:', error);
          // Usar ubicación por defecto si falla la geolocalización
          setCity({ name: 'Madrid', country: 'ES', lat: 40.4168, lon: -3.7038 });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 600000 // 10 minutos
        }
      );
    } else {
      // Geolocalización no soportada, usar ubicación por defecto
      setCity({ name: 'Madrid', country: 'ES', lat: 40.4168, lon: -3.7038 });
    }
  };

  // Hook para cargar ubicación al iniciar
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Hook para actualizar el clima cuando cambia la ciudad
  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city]);

  const handleSearch = (searchCity: { name: string; country: string; lat: number; lon: number }) => {
    setCity(searchCity);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <WeatherBackground weatherCondition={weatherData?.weather[0]?.main || 'Clear'} />
      {/* Date and Time Component */}
      <DateTime />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
              Clima
            </h1>
            <p className="text-white/80 text-lg">
              Información meteorológica en tiempo real
            </p>
          </div>
          {/* Search Bar */}
          <div className="mb-8 animate-fade-in">
            <SearchBar onSearch={handleSearch} />
            <div className="flex justify-center mt-4">
              <LocationButton onLocationFound={handleSearch} />
            </div>
          </div>
          {/* Main Content */}
          <div className="animate-fade-in">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="text-center text-white bg-red-500/20 backdrop-blur-sm rounded-2xl p-8">
                <p className="text-xl">{error}</p>
              </div>
            ) : weatherData ? (
              <WeatherCard data={weatherData} />
            ) : null}
          </div>
        </div>
      </div>
      {/* Footer copyright */}
      <footer className="fixed bottom-0 left-0 w-full z-50 flex justify-center items-center py-3 pointer-events-none">
        <span className="text-white/70 text-xs bg-black/20 px-4 py-2 rounded-xl backdrop-blur-md pointer-events-auto">
          © Santiago Agüero
        </span>
      </footer>
    </div>
  );
};

export default App;
