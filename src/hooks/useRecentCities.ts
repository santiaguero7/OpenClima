import { useState, useEffect } from 'react';

export interface RecentCity {
  name: string;
  country: string;
  timestamp: number;
}

export const useRecentCities = () => {
  const [recentCities, setRecentCities] = useState<RecentCity[]>([]);
  const STORAGE_KEY = 'weather-recent-cities';
  const MAX_RECENT = 5;

  // Cargar ciudades recientes del localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const cities = JSON.parse(stored);
        setRecentCities(cities);
      }
    } catch (error) {
      console.error('Error al cargar ciudades recientes:', error);
    }
  }, []);

  // Agregar una nueva ciudad a las recientes
  const addRecentCity = (name: string, country: string) => {
    const newCity: RecentCity = {
      name,
      country,
      timestamp: Date.now()
    };

    setRecentCities(prev => {
      // Filtrar si ya existe la ciudad
      const filtered = prev.filter(city => 
        city.name.toLowerCase() !== name.toLowerCase()
      );
      
      // Agregar al inicio y limitar a MAX_RECENT
      const updated = [newCity, ...filtered].slice(0, MAX_RECENT);
      
      // Guardar en localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Error al guardar ciudad reciente:', error);
      }
      
      return updated;
    });
  };

  // Limpiar ciudades recientes
  const clearRecentCities = () => {
    setRecentCities([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error al limpiar ciudades recientes:', error);
    }
  };

  return {
    recentCities,
    addRecentCity,
    clearRecentCities
  };
};
