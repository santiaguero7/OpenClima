import { useState } from 'react';

// Tipos para los datos del clima
export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  visibility: number;
  clouds: {
    all: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
}

export interface ForecastData {
  dt: number;
  main: {
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  dt_txt: string;
}

export interface WeatherState {
  current: WeatherData | null;
  forecast: ForecastData[];
  loading: boolean;
  error: string;
}

export const useWeatherAPI = () => {
  const [weatherState, setWeatherState] = useState<WeatherState>({
    current: null,
    forecast: [],
    loading: false,
    error: ''
  });

  // Obtener API key desde variables de entorno o usar una de ejemplo
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'tu_api_key_aqui';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  // Función para obtener clima actual
  const fetchWeather = async (city: string): Promise<void> => {
    setWeatherState(prev => ({
      ...prev,
      loading: true,
      error: ''
    }));

    try {
      // Buscar por nombre de ciudad
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`
      );

      if (!weatherResponse.ok) {
        throw new Error('Ciudad no encontrada');
      }

      const weatherData = await weatherResponse.json();

      // Obtener pronóstico usando las coordenadas
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${API_KEY}&units=metric&lang=es`
      );

      let forecastData = [];
      if (forecastResponse.ok) {
        const forecast = await forecastResponse.json();
        // Filtrar para obtener un pronóstico por día (aproximadamente al mediodía)
        forecastData = forecast.list.filter((_: any, index: number) => index % 8 === 0).slice(0, 5);
      }

      setWeatherState({
        current: weatherData,
        forecast: forecastData,
        loading: false,
        error: ''
      });

    } catch (error) {
      setWeatherState({
        current: null,
        forecast: [],
        loading: false,
        error: error instanceof Error ? error.message : 'Error al obtener datos del clima'
      });
    }
  };

  // Función para obtener clima por coordenadas (geolocalización)
  const fetchWeatherByCoords = async (lat: number, lon: number): Promise<void> => {
    setWeatherState(prev => ({
      ...prev,
      loading: true,
      error: ''
    }));

    try {
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
      );

      if (!weatherResponse.ok) {
        throw new Error('No se pudo obtener el clima de tu ubicación');
      }

      const weatherData = await weatherResponse.json();

      // Obtener pronóstico
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
      );

      let forecastData = [];
      if (forecastResponse.ok) {
        const forecast = await forecastResponse.json();
        forecastData = forecast.list.filter((_: any, index: number) => index % 8 === 0).slice(0, 5);
      }

      setWeatherState({
        current: weatherData,
        forecast: forecastData,
        loading: false,
        error: ''
      });

    } catch (error) {
      setWeatherState({
        current: null,
        forecast: [],
        loading: false,
        error: error instanceof Error ? error.message : 'Error al obtener datos del clima'
      });
    }
  };

  // Función para obtener ubicación del usuario
  const fetchUserLocation = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('La geolocalización no es soportada por este navegador'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude)
            .then(resolve)
            .catch(reject);
        },
        (error) => {
          let message = 'Error al obtener la ubicación';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = 'Permiso de ubicación denegado';
              break;
            case error.POSITION_UNAVAILABLE:
              message = 'Información de ubicación no disponible';
              break;
            case error.TIMEOUT:
              message = 'Tiempo de espera agotado al obtener la ubicación';
              break;
          }
          reject(new Error(message));
        }
      );
    });
  };

  return {
    ...weatherState,
    fetchWeather,
    fetchWeatherByCoords,
    fetchUserLocation
  };
};
