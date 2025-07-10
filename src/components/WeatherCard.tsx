import { Cloud, Droplets, Wind, Thermometer, Eye, Gauge } from 'lucide-react';
import { WeatherIcon } from './WeatherIcon';

interface WeatherData {
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
  };
  visibility?: number;
  clouds?: {
    all: number;
  };
}

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherCard = ({ data }: WeatherCardProps) => {
  const { name, main, weather, wind, sys, visibility, clouds } = data;
  const currentWeather = weather[0];

  // Función para convertir visibilidad de metros a kilómetros
  const getVisibilityKm = () => {
    if (visibility) {
      return (visibility / 1000).toFixed(1);
    }
    return '10'; // valor por defecto
  };

  // Función para calcular el punto de rocío aproximado
  const getDewPoint = () => {
    const temp = main.temp;
    const humidity = main.humidity;
    const dewPoint = temp - ((100 - humidity) / 5);
    return Math.round(dewPoint);
  };

  // Función para obtener el índice UV simulado basado en la hora
  const getUVIndex = () => {
    const hour = new Date().getHours();
    if (hour >= 10 && hour <= 16) {
      return Math.floor(Math.random() * 6) + 5; // 5-10 durante horas pico
    }
    return Math.floor(Math.random() * 3) + 1; // 1-3 durante otras horas
  };

  const uvIndex = getUVIndex();
  const getUVLevel = (uv: number) => {
    if (uv <= 2) return { text: 'Bajo', color: 'from-green-400 to-green-500' };
    if (uv <= 5) return { text: 'Moderado', color: 'from-yellow-400 to-yellow-500' };
    if (uv <= 7) return { text: 'Alto', color: 'from-orange-400 to-orange-500' };
    if (uv <= 10) return { text: 'Muy Alto', color: 'from-red-400 to-red-500' };
    return { text: 'Extremo', color: 'from-purple-400 to-purple-500' };
  };

  const uvLevel = getUVLevel(uvIndex);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Weather Card */}
      <div className="lg:col-span-2">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {name}, {sys.country}
              </h2>
              <p className="text-white/70 capitalize text-lg">
                {currentWeather.description}
              </p>
            </div>
            <div className="animate-float">
              <WeatherIcon condition={currentWeather.main} size={80} />
            </div>
          </div>

          <div className="flex items-end gap-4 mb-8">
            <span className="text-7xl md:text-8xl font-light text-white">
              {Math.round(main.temp)}°
            </span>
            <div className="pb-4">
              <p className="text-white/70 text-lg">
                Sensación térmica {Math.round(main.feels_like)}°
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/5 rounded-xl">
              <Droplets className="w-6 h-6 text-blue-300 mx-auto mb-2" />
              <p className="text-white/70 text-sm">Humedad</p>
              <p className="text-white font-semibold">{main.humidity}%</p>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl">
              <Wind className="w-6 h-6 text-blue-300 mx-auto mb-2" />
              <p className="text-white/70 text-sm">Viento</p>
              <p className="text-white font-semibold">{wind.speed} km/h</p>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl">
              <Gauge className="w-6 h-6 text-blue-300 mx-auto mb-2" />
              <p className="text-white/70 text-sm">Presión</p>
              <p className="text-white font-semibold">{main.pressure} hPa</p>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl">
              <Thermometer className="w-6 h-6 text-blue-300 mx-auto mb-2" />
              <p className="text-white/70 text-sm">Sensación</p>
              <p className="text-white font-semibold">{Math.round(main.feels_like)}°</p>
            </div>
          </div>
        </div>
      </div>

      {/* Side Stats */}
      <div className="space-y-6">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
          <h3 className="text-white font-semibold text-lg mb-4">Detalles</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-blue-300" />
                <span className="text-white/70">Visibilidad</span>
              </div>
              <span className="text-white font-medium">{getVisibilityKm()} km</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cloud className="w-5 h-5 text-blue-300" />
                <span className="text-white/70">Nubosidad</span>
              </div>
              <span className="text-white font-medium">{clouds?.all || 0}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Droplets className="w-5 h-5 text-blue-300" />
                <span className="text-white/70">Punto de rocío</span>
              </div>
              <span className="text-white font-medium">{getDewPoint()}°</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
          <h3 className="text-white font-semibold text-lg mb-4">Índice UV</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">{uvIndex}</div>
            <div className="text-white/70 text-sm">{uvLevel.text}</div>
            <div className="w-full bg-white/20 rounded-full h-2 mt-3">
              <div className={`bg-gradient-to-r ${uvLevel.color} h-2 rounded-full transition-all duration-300`} style={{width: `${Math.min(uvIndex * 10, 100)}%`}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
