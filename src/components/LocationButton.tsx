import { MapPin, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface LocationButtonProps {
  onLocationFound: (location: { name: string; country: string; lat: number; lon: number }) => void;
}

export const LocationButton = ({ onLocationFound }: LocationButtonProps) => {
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('La geolocalización no está soportada en este navegador.');
      return;
    }

    setLoading(true);
    
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
              onLocationFound(locationData);
            }
          } else {
            // Si falla la geocodificación, usar coordenadas directamente
            const locationData = {
              name: 'Tu ubicación',
              country: '',
              lat: latitude,
              lon: longitude
            };
            onLocationFound(locationData);
          }
        } catch (error) {
          console.error('Error al obtener nombre de ubicación:', error);
          alert('Error al obtener la información de la ubicación.');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error('Error de geolocalización:', error);
        setLoading(false);
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert('Acceso a la ubicación denegado. Por favor, permite el acceso a la ubicación.');
            break;
          case error.POSITION_UNAVAILABLE:
            alert('La información de ubicación no está disponible.');
            break;
          case error.TIMEOUT:
            alert('La solicitud de ubicación ha expirado.');
            break;
          default:
            alert('Error desconocido al obtener la ubicación.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000 // 10 minutos
      }
    );
  };

  return (
    <button
      onClick={getCurrentLocation}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <MapPin className="w-4 h-4" />
      )}
      <span className="text-sm">
        {loading ? 'Obteniendo...' : 'Mi ubicación'}
      </span>
    </button>
  );
};
