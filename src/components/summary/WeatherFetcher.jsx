import { useEffect, useState } from "react";

export default function WeatherFetcher({ lat, lon, onData }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchWeather = async () => {
      setLoading(true);

      const url = `https://api.open-meteo.com/v1/forecast
        ?latitude=${lat}
        &longitude=${lon}
        &daily=weathercode,temperature_2m_max,temperature_2m_min,
        uv_index_max,uv_index_clear_sky_max,
        windspeed_10m_max,precipitation_sum,cloudcover_mean
        &forecast_days=14
        &timezone=auto`.replace(/\s+/g, "");

      const res = await fetch(url);
      const data = await res.json();

      const map = {};
      data.daily.time.forEach((date, i) => {
        map[date] = {
          code: data.daily.weathercode[i],
          tempMax: data.daily.temperature_2m_max[i],
          tempMin: data.daily.temperature_2m_min[i],
          uv: data.daily.uv_index_max[i],
          uvClear: data.daily.uv_index_clear_sky_max[i],
          wind: data.daily.windspeed_10m_max[i],
          rain: data.daily.precipitation_sum[i],
          cloud: data.daily.cloudcover_mean[i],
        };
      });

      onData(map);
      setLoading(false);
    };

    fetchWeather();
  }, [lat, lon]);

  return (
    <div>
      {loading && (
        <p className="text-gray-500">Fetching weather data...</p>
      )}
    </div>
  );
}
