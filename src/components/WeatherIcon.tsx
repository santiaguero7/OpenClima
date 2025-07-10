import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, Wind } from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  size?: number;
}

export const WeatherIcon = ({ condition, size = 60 }: WeatherIconProps) => {
  const getIcon = () => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun size={size} className="text-yellow-300 animate-pulse" />;
      case 'clouds':
        return <Cloud size={size} className="text-white" />;
      case 'rain':
        return <CloudRain size={size} className="text-blue-300" />;
      case 'drizzle':
        return <CloudDrizzle size={size} className="text-blue-300" />;
      case 'snow':
        return <CloudSnow size={size} className="text-white" />;
      case 'thunderstorm':
        return <CloudLightning size={size} className="text-purple-300" />;
      case 'mist':
      case 'fog':
        return <Wind size={size} className="text-gray-300" />;
      default:
        return <Sun size={size} className="text-yellow-300" />;
    }
  };

  return (
    <div className="flex items-center justify-center">
      {getIcon()}
    </div>
  );
};

export default WeatherIcon;
