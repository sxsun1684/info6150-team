import { Link } from "react-router-dom";
import tripImg from "../../assets/trip.png";
import weatherImg from "../../assets/weather.png";
import outfitImg from "../../assets/outfit.png";

export default function FeatureCards() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl w-full mb-20">

      {/* Trip */}
      <Link
        to="/trips"
        className="bg-white shadow-md rounded-xl p-6 text-center border hover:border-blue-300 transition-all"
      >
        <img
          src={tripImg}
          alt="Trip Icon"
          className="w-32 h-32 mx-auto mb-4 object-contain"
        />

        <h2 className="text-2xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
          Trip Calendar
        </h2>

        <p className="text-gray-600 text-sm md:text-justify text-center leading-relaxed">
          View the calendar and instantly see weather forecasts for the next 7 days.
          Easily pick the ideal day for your travel.
        </p>
      </Link>

      {/* Weather */}
      <Link
        to="/weather"
        className="bg-white shadow-md rounded-xl p-6 text-center border hover:border-blue-300 transition-all"
      >
        <img
          src={weatherImg}
          alt="Weather Icon"
          className="w-32 h-32 mx-auto mb-4 object-contain"
        />

        <h2 className="text-2xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
          Destination Weather
        </h2>

        <p className="text-gray-600 text-sm md:text-justify text-center leading-relaxed">
          Enter your destination to instantly check temperature,
          weather conditions, wind, and precipitation probability.
        </p>
      </Link>

      {/* Outfit Advisor */}
      <Link
        to="/outfit"
        className="bg-white shadow-md rounded-xl p-6 text-center border hover:border-blue-300 transition-all"
      >
        <img
          src={outfitImg}
          alt="Outfit Icon"
          className="w-32 h-32 mx-auto mb-4 object-contain"
        />

        <h2 className="text-2xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
          Outfit Advisor
        </h2>

        <p className="text-gray-600 text-sm md:text-justify text-center leading-relaxed">
          Get weather-based outfit suggestions using temperature, wind, rain,
          and UV index — helping you dress perfectly for your journey.
        </p>
      </Link>

    </section>
  );
}
