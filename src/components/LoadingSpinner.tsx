import { Loader } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader className="w-12 h-12 text-white animate-spin mb-4" />
      <p className="text-white/70 text-lg">Cargando información del clima...</p>
    </div>
  );
};

export default LoadingSpinner;
