import { WEATHER_ICON } from "../../../src/utils/weatherMapIcon.js";

// -------------------------------------
// Weather-based UI theme definitions
// Each theme controls border, background,
// text color, glow effect, and gradient bar
// -------------------------------------
const WEATHER_THEME = {
    sunny: {
        border: "border-orange-400",
        bg: "bg-orange-100/50",
        textColor: "text-orange-900",   // Darker text for readability
        glow: "bg-orange-300/30",
        gradient: "from-orange-400 via-amber-300 to-yellow-400",
    },
    cloud: {
        border: "border-blue-300",
        bg: "bg-blue-100/40",
        textColor: "text-blue-900",     // Dark text on light background
        glow: "bg-blue-200/30",
        gradient: "from-blue-300 via-blue-200 to-cyan-300",
    },
    rain: {
        border: "border-indigo-400",
        bg: "bg-indigo-600/30",
        textColor: "text-white",        // Light text on dark background
        glow: "bg-indigo-400/30",
        gradient: "from-indigo-500 via-purple-500 to-blue-700",
    },
    snow: {
        border: "border-cyan-300",
        bg: "bg-cyan-100/40",
        textColor: "text-cyan-900",     // Dark text for contrast
        glow: "bg-cyan-200/40",
        gradient: "from-cyan-300 via-blue-200 to-white",
    },
    overcast: {
        border: "border-gray-400",
        bg: "bg-gray-200/40",
        textColor: "text-gray-900",
        glow: "bg-gray-400/30",
        gradient: "from-gray-400 via-gray-300 to-slate-400",
    },
    neutral: {
        border: "border-gray-300",
        bg: "bg-white/40",
        textColor: "text-gray-800",
        glow: "bg-gray-200/40",
        gradient: "from-gray-200 via-gray-100 to-gray-300",
    },
};

// Theme override for selected calendar day
const SELECTED_THEME = {
    border: "border-pink-400",
    bg: "bg-pink-100/40",
    textColor: "text-pink-700",
    glow: "bg-pink-300/40",
    gradient: "from-pink-400 via-rose-300 to-pink-500",
};

// -------------------------------------
// Weather code groups (Open-Meteo)
// Used to map weather codes to UI themes
// -------------------------------------
const SUNNY_CODES = [0, 1];
const CLOUD_CODES = [2, 3];
const RAIN_CODES = [61, 63, 65, 80, 81, 82];
const SNOW_CODES = [71, 73, 75, 77, 85, 86];

export default function CalendarDay({
    day,
    today,
    weatherData,
    selectedDay,
    setSelectedDay,
}) {
    const dateStr = day.toISOString().split("T")[0];

    // Calculate day difference relative to today
    // Weather data is available for the next 14 days only
    const diffDays = Math.floor((day - today) / (1000 * 60 * 60 * 24));
    const weather = diffDays >= 0 && diffDays <= 13 ? weatherData[dateStr] : null;

    const isPast = day < today.setHours(0, 0, 0, 0);
    const isSelected = selectedDay?.toDateString() === day.toDateString();

    // Resolve weather icon with fallback
    const icon =
        weather && WEATHER_ICON[weather.code]
            ? WEATHER_ICON[weather.code]
            : WEATHER_ICON.default;

    // -------------------------------------
    // Determine theme based on weather code
    // Defaults to neutral to avoid undefined
    // -------------------------------------
    let theme = WEATHER_THEME.neutral;

    if (weather) {
        if (SUNNY_CODES.includes(weather.code)) {
            theme = WEATHER_THEME.sunny;
        } else if (CLOUD_CODES.includes(weather.code)) {
            theme = WEATHER_THEME.cloud;
        } else if (RAIN_CODES.includes(weather.code)) {
            theme = WEATHER_THEME.rain;
        } else if (SNOW_CODES.includes(weather.code)) {
            theme = WEATHER_THEME.snow;
        } else {
            theme = WEATHER_THEME.overcast;
        }
    }

    // Override theme if the day is selected
    if (isSelected) {
        theme = SELECTED_THEME;
    }

    // -------------------------------------
    // Render calendar day cell
    // -------------------------------------
    return (
        <button
            disabled={isPast}
            onClick={() => setSelectedDay(day)}
            aria-label={`Select ${dateStr}`}
            className={`
                group relative w-full p-4 rounded-2xl text-center transition-all
                backdrop-blur-xl shadow-lg hover:shadow-2xl
                hover:-translate-y-1 active:scale-95
                border ${theme.border} ${theme.bg}
                ${isSelected ? "ring-2 ring-white/40 scale-[1.02]" : ""}
                ${isPast ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
            `}
        >
            {/* Glow layer */}
            <div
                className={`absolute inset-0 rounded-2xl ${theme.glow} blur-xl group-hover:blur-2xl transition-all`}
            />

            {/* Day number */}
            <div className={`relative text-lg font-bold drop-shadow ${theme.textColor}`}>
                {day.getDate()}
            </div>

            {/* Weather icon */}
            {weather && (
                <img
                    src={icon}
                    alt="weather icon"
                    className="relative w-12 h-12 mx-auto mt-2 drop-shadow-lg group-hover:scale-110 transition-transform"
                />
            )}

            {/* Temperature */}
            {weather && (
                <div className={`relative text-sm mt-1 font-semibold ${theme.textColor}`}>
                    {weather.tempMin && weather.tempMax
                        ? `${weather.tempMin}° / ${weather.tempMax}°`
                        : `${weather.temp}°`}
                </div>
            )}

            {/* Bottom gradient indicator */}
            {weather && (
                <div
                    className={`absolute bottom-0 left-0 w-full h-1 rounded-b-2xl bg-gradient-to-r ${theme.gradient}`}
                />
            )}
        </button>
    );
}
