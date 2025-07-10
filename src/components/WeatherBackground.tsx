interface WeatherBackgroundProps {
  weatherCondition: string;
}

export const WeatherBackground = ({ weatherCondition }: WeatherBackgroundProps) => {
  const getGradient = () => {
    switch (weatherCondition.toLowerCase()) {
      case 'clear':
        return 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';
      case 'clouds':
        return 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600';
      case 'rain':
      case 'drizzle':
        return 'bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800';
      case 'snow':
        return 'bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400';
      case 'thunderstorm':
        return 'bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800';
      case 'mist':
      case 'fog':
        return 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500';
      default:
        return 'bg-gradient-to-br from-blue-400 via-purple-500 to-purple-600';
    }
  };

  return (
    <div className={`absolute inset-0 ${getGradient()} transition-all duration-1000`}>
      {/* Animated particles/shapes for visual interest */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-white rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-32 h-32 bg-white rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default WeatherBackground;
