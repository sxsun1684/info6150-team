import { useEffect, useState } from "react";
import WeatherCalendar from "../components/calendar/WeatherCalendar";
import LocationSelector from "../components/location/LocationSelector";
import TripSummary from "../components/summary/TripSummary.jsx";

export default function TripPage() {
    // Default city = San Francisco
    const [location, setLocation] = useState({
        name: "San Francisco, USA",
        lat: 37.7749,
        lon: -122.4194,
    });

    // Only this one is needed
    const [selectedWeather, setSelectedWeather] = useState(null);

    // Attempt to auto-detect user location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocation({
                    name: "Your Location",
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude,
                });
            },
            () => {
                console.log("Location access denied → keep using default SF");
            }
        );
    }, []);

    return (
        <main className="max-w-5xl mx-auto px-6 py-10">
            <header className="mb-10 text-center">
  <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
    Plan Your Trip
  </h1>

  <p className="text-gray-600 mt-3 text-lg max-w-xl mx-auto">
    Choose a destination and select a travel date to preview the weather forecast.
  </p>

  <div className="h-1 w-24 bg-blue-200 mx-auto mt-6 rounded-full"></div>
</header>


            <LocationSelector onLocationSelect={setLocation} />

            <WeatherCalendar
                lat={location.lat}
                lon={location.lon}
                onSelectDate={(weatherPackage) => {
                    setSelectedWeather(weatherPackage); // ⭐ only here
                }}
            />

            <TripSummary weather={selectedWeather} />

        </main>
    );
}
