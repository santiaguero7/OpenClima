// useForecast.ts
// Hook personalizado para obtener el pronóstico a 5 días

import { useState, useEffect } from 'react';
import { mockForecastData } from '../data/mockWeatherData';

export interface ForecastItem {
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

export function useForecast(city: string) {
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchForecast = async () => {
    setLoading(true);
    setError('');
    try {
      // Usar datos mock por ahora
      setTimeout(() => {
        setForecast(mockForecastData);
        setLoading(false);
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Error al obtener el pronóstico');
      setForecast([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) fetchForecast();
    // eslint-disable-next-line
  }, [city]);

  return { forecast, loading, error };
}
