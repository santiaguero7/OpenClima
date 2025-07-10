// useForecast.ts
// Hook personalizado para obtener el pronóstico a 5 días

import { useState, useEffect } from 'react';
// import { mockForecastData } from '../data/mockWeatherData'; // Eliminar referencia a datos mock

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
      // Aquí deberías implementar la llamada real a la API de OpenWeatherMap para el pronóstico
      // Ejemplo:
      // const API_KEY = 'TU_API_KEY';
      // const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=es`);
      // const data = await response.json();
      // setForecast(data.list);
      // setLoading(false);
      setForecast([]); // Temporal: devuelve array vacío
      setLoading(false);
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
