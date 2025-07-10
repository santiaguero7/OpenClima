// WeatherDetails.tsx
// Detalles adicionales del clima

import React from 'react';
import { Eye, Cloud, Droplets, Sun } from 'lucide-react';
import type { WeatherData } from '../hooks/useWeather';

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  return (
    <div className="glass-card h-fit animate-fade-in">
      <h3 className="text-white font-semibold text-lg mb-6 text-shadow-lg">Detalles</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Eye size={16} className="text-blue-300" />
            <span className="text-white/80 text-sm">Visibilidad</span>
          </div>
          <span className="text-white font-semibold">
            {data.visibility ? (data.visibility / 1000).toFixed(1) : '-'} km
          </span>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Cloud size={16} className="text-blue-300" />
            <span className="text-white/80 text-sm">Nubosidad</span>
          </div>
          <span className="text-white font-semibold">{data.clouds?.all ?? 0}%</span>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Droplets size={16} className="text-blue-300" />
            <span className="text-white/80 text-sm">Punto de rocío</span>
          </div>
          <span className="text-white font-semibold">
            {Math.round(data.main.temp - ((100 - data.main.humidity) / 5))}°C
          </span>
        </div>
        
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Sun size={16} className="text-yellow-300" />
            <span className="text-white/80 text-sm">Índice UV</span>
          </div>
          <span className="text-white font-semibold">Moderado</span>
        </div>
      </div>
      
      {/* UV Index Bar */}
      <div className="mt-6 p-4 bg-white/5 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/80 text-sm">Índice UV</span>
          <span className="text-white font-bold text-2xl">5</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div className="bg-gradient-to-r from-green-400 to-yellow-400 h-2 rounded-full" style={{width: '50%'}}></div>
        </div>
        <div className="text-white/70 text-xs mt-1">Moderado</div>
      </div>
    </div>
  );
};

export default WeatherDetails;
