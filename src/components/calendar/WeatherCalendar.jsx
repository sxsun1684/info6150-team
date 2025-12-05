// import { useEffect, useState } from "react";
// import CalendarGrid from "./CalendarGrid";
//
// export default function WeatherCalendar({ lat, lon, onSelectDate }) {
//     const [weatherData, setWeatherData] = useState({});
//     const [selectedDay, setSelectedDay] = useState(null);
//
//     //
//     const handleConfirm = () => {
//         if (!selectedDay) return;
//
//         const dayStr = selectedDay.toISOString().split("T")[0];
//
//         onSelectDate({
//             date: selectedDay,
//             daily: weatherData[dayStr],
//             forecast14: Object.entries(weatherData).map(([date, d]) => ({
//                 date,
//                 tempMin: d.tempMin,
//                 tempMax: d.tempMax,
//                 code: d.code,
//             })),
//         });
//     };
//
//     /**
//      * Fetch weather whenever lat/lon changes
//      */
//     useEffect(() => {
//         if (!lat || !lon) return;
//
//         const fetchWeather = async () => {
//             const res = await fetch(
//                 `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&forecast_days=14&timezone=auto`
//             );
//
//             const data = await res.json();
//
//             const map = {};
//             data.daily.time.forEach((date, index) => {
//                 map[date] = {
//                     code: data.daily.weathercode[index],
//                     tempMax: data.daily.temperature_2m_max[index],
//                     tempMin: data.daily.temperature_2m_min[index],
//                 };
//             });
//
//             setWeatherData(map);
//         };
//
//         fetchWeather();
//     }, [lat, lon]);
//
//     return (
//         <section className="max-w-4xl mx-auto">
//             <header className="mb-4 text-center">
//                 <h2 className="text-2xl font-bold">Select Your Travel Date</h2>
//             </header>
//
//             <CalendarGrid
//                 weatherData={weatherData}
//                 selectedDay={selectedDay}
//                 setSelectedDay={setSelectedDay}
//             />
//
//             <div className="flex justify-center mt-6">
//                 <button
//                     disabled={!selectedDay}
//                     onClick={handleConfirm}
//                     className={`px-6 py-3 rounded-lg text-white transition
//                         ${
//                             selectedDay
//                                 ? "bg-blue-600 hover:bg-blue-700"
//                                 : "bg-gray-400 cursor-not-allowed"
//                         }`}
//                 >
//                     Continue
//                 </button>
//             </div>
//         </section>
//     );
// }
import { useEffect, useState } from "react";
import CalendarGrid from "./CalendarGrid";

export default function WeatherCalendar({ lat, lon, onSelectDate }) {
    const [weatherData, setWeatherData] = useState({});
    const [selectedDay, setSelectedDay] = useState(null);

//click button check
    const handleConfirm = () => {
        if (!selectedDay) return;

        const dayStr = selectedDay.toISOString().split("T")[0];

        onSelectDate({
            date: selectedDay,
            daily: weatherData[dayStr],
            forecast14: Object.entries(weatherData).map(([date, d]) => ({
                date,
                tempMin: d.tempMin,
                tempMax: d.tempMax,
                code: d.code,
            })),
        });
    };


    // fetch 14 days weather data
    useEffect(() => {
        if (!lat || !lon) return;

        const fetchWeather = async () => {
            const url = `
                https://api.open-meteo.com/v1/forecast?
                latitude=${lat}&longitude=${lon}
                &daily=weathercode,
                        temperature_2m_max,temperature_2m_min,
                        uv_index_max,
                        windspeed_10m_max,
                        precipitation_sum,
                        cloudcover_mean
                &forecast_days=14
                &timezone=auto
            `.replace(/\s+/g, "");

            const res = await fetch(url);
            const data = await res.json();

            // 👉 Debug 用：务必检查 weathercode 是否存在
            console.log("weathercode:", data.daily.weathercode);

            const map = {};
            data.daily.time.forEach((date, index) => {
                map[date] = {
                    code: data.daily.weathercode[index],     // ⭐ 图标依赖字段
                    tempMax: data.daily.temperature_2m_max[index],
                    tempMin: data.daily.temperature_2m_min[index],
                    uv: data.daily.uv_index_max[index],
                    wind: data.daily.windspeed_10m_max[index],
                    rain: data.daily.precipitation_sum[index],
                    cloud: data.daily.cloudcover_mean[index],
                };
            });

            console.log("map:", map); // check input again

            setWeatherData(map);
        };

        fetchWeather();
    }, [lat, lon]);

    // UI

    return (
        <section className="max-w-4xl mx-auto">
            <header className="mb-4 text-center">
                <h2 className="text-2xl font-bold">Select Your Travel Date</h2>
            </header>

            <CalendarGrid
                weatherData={weatherData}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
            />

            <div className="flex justify-center mt-6">
                <button
                    disabled={!selectedDay}
                    onClick={handleConfirm}
                    className={`px-6 py-3 rounded-lg text-white transition
                        ${
                            selectedDay
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    Continue
                </button>
            </div>
        </section>
    );
}
