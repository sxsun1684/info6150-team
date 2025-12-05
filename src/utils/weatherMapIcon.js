import sun from "../assets/weather/sun.png";
import partly from "../assets/weather/partly.png";
import cloud from "../assets/weather/cloud.png";
import rain from "../assets/weather/rain.png";
import shower from "../assets/weather/shower.png";
import snowLight from "../assets/weather/snow-light.png";
import snow from "../assets/weather/snow.png";
import snowHeavy from "../assets/weather/snow-heavy.png";
import snowShower from "../assets/weather/snow-shower.png";

/**
 * A single source of truth for mapping Open-Meteo weather codes to icons.
 */
export const WEATHER_ICON = {
  0: sun,         // Clear sky
  1: partly,      // Mainly clear
  2: partly,      // Partly cloudy
  3: cloud,       // Overcast

  61: rain,       // Rain
  63: rain,
  65: rain,

  80: shower,     // Shower rain
  81: shower,
  82: shower,

  // Snow (Open-Meteo weather codes)
  71: snowLight,      // Light snow
  73: snow,           // Moderate snow
  75: snowHeavy,      // Heavy snow
  77: snow,           // Snow grains
  85: snowShower,     // Snow showers
  86: snowHeavy,      // Heavy snow showers

  default: cloud, // Fallback
};