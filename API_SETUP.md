# 🌤️ Configuración de la API de OpenWeatherMap

## Obtener API Key gratuita

1. **Registrarse en OpenWeatherMap:**
   - Visita: https://openweathermap.org/api
   - Haz clic en "Get API key"
   - Crea una cuenta gratuita

2. **Obtener tu API Key:**
   - Inicia sesión en tu dashboard
   - Ve a "API keys" 
   - Copia tu API key

3. **Configurar la API Key:**
   - Abre `src/App.tsx`
   - Busca la línea: `const API_KEY = '9b9d0f8a1a33a2b8e2c1f2d8c5e8f5c1';`
   - Reemplaza con tu API key real

## Límites de la API gratuita

- **1,000 llamadas/día**
- **60 llamadas/minuto**
- Datos actuales del clima
- Pronóstico de 5 días

## Características implementadas

### ✅ Búsqueda inteligente
- Autocompletado con sugerencias
- Ciudades populares
- Búsqueda por nombre de ciudad
- Banderas de países

### ✅ Datos reales del clima
- Temperatura actual y sensación térmica
- Humedad, presión atmosférica
- Velocidad del viento
- Visibilidad y nubosidad
- Íconos del clima dinámicos

### ✅ Fallback inteligente
- Si la API falla, usa datos simulados
- Nunca se queda sin datos
- Experiencia fluida para el usuario

## Ejemplo de uso

```typescript
// En App.tsx
const API_KEY = 'tu_api_key_aqui';
```

## Nota importante

Por seguridad, en producción deberías usar variables de entorno:

```typescript
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
```

Y crear un archivo `.env` en la raíz del proyecto:
```
REACT_APP_OPENWEATHER_API_KEY=tu_api_key_aqui
```
