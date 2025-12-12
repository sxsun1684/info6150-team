import {useEffect, useState} from "react";
import WeatherCalendar from "../components/calendar/WeatherCalendar";
import LocationSelector from "../components/location/LocationSelector";
import TripSummary from "../components/summary/TripSummary.jsx";
import Modal from "../components/ui/Modal.jsx";

export default function TripPage() {
    // State for location
    const [location, setLocation] = useState({
        name: "San Francisco, USA",
        lat: 37.7749,
        lon: -122.4194,
    });

    // Summary modal state
    const [openSummary, setOpenSummary] = useState(false);
    const [weatherSummary, setWeatherSummary] = useState(null);

    // Auto-detect user location
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
                console.log("Location denied → staying with SF default");
            }
        );
    }, []);

    // RENDER UI
    return (
        <main className="max-w-5xl mx-auto px-6 py-10">

            {/* PAGE HEADER */}
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                    Plan Your Trip
                </h1>
                <p className="mt-2 text-gray-600">
                    Select a city and pick your travel date.
                </p>
            </header>


            {/* CURRENT LOCATION */}
            <section className="mb-6">
                <p className="text-gray-700">
                    <strong>Current Location:</strong> {location.name}
                </p>
            </section>

            {/* CITY SEARCH INPUT */}
            <LocationSelector onLocationSelect={setLocation}/>

            {/* WEATHER CALENDAR */}
            <WeatherCalendar
                lat={location.lat}
                lon={location.lon}
                onSelectDate={(summary) => {
                    setWeatherSummary(summary);
                    setOpenSummary(true);
                }}
            />

            {/* SUMMARY MODAL */}
            <Modal open={openSummary} onClose={() => setOpenSummary(false)}>
                <TripSummary weather={weatherSummary}/>
            </Modal>
        </main>
    );
}
