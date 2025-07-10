// ForecastList.tsx
// Pronóstico a 5 días en scroll horizontal

import type { ForecastItem } from '../hooks/useForecast';
import WeatherIcon from './WeatherIcon';

interface ForecastListProps {
  forecast: ForecastItem[];
}

const ForecastList = ({ forecast }: ForecastListProps) => {
  if (!forecast || forecast.length === 0) {
    return null;
  }

  return (
    <div className="glass-card animate-fade-in">
      <h3 className="text-white font-semibold text-lg mb-6 text-shadow-lg">
        Pronóstico a 5 días
      </h3>
      
      <div className="flex space-x-4 overflow-x-auto py-2 scrollbar-hide">
        {forecast.map((item, index) => (
          <div 
            key={item.dt} 
            className="min-w-[140px] bg-white/10 backdrop-blur-md rounded-xl p-5 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 flex-shrink-0 hover:transform hover:scale-105"
          >
            <div className="text-white/90 text-sm font-medium mb-3">
              {index === 0 ? 'Hoy' : new Date(item.dt_txt).toLocaleDateString('es-ES', { 
                weekday: 'short', 
                day: 'numeric' 
              })}
            </div>
            
            <div className="flex justify-center mb-4">
              <WeatherIcon 
                condition={item.weather[0].main} 
                size={40} 
              />
            </div>
            
            <div className="space-y-1">
              <div className="text-white text-lg font-bold">
                {Math.round(item.main.temp_max)}°
              </div>
              <div className="text-white/60 text-sm">
                {Math.round(item.main.temp_min)}°
              </div>
            </div>
            
            <div className="text-white/70 text-xs capitalize mt-3 leading-tight">
              {item.weather[0].description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastList;
