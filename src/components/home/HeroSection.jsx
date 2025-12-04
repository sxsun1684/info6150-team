import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="text-center max-w-4xl mb-16">
      <h1 className="text-5xl font-bold mb-6 text-gray-900 leading-tight">
        GoodTrip — Your Smart Travel Weather & Outfit Companion
      </h1>

      <p className="text-lg text-gray-600 md:text-justify text-center leading-relaxed">
        Plan your trip with confidence. GoodTrip helps you check trip-date weather,
        explore destination forecasts, and get intelligent outfit suggestions based
        on real weather conditions. Whether you're catching a morning flight or
        arriving at night, GoodTrip ensures you're always prepared.
      </p>

      <div className="mt-8">
        <Link
          to="/trips"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg shadow"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
