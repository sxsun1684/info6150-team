import HowItWorksCard from "./HowItWorksCard";

export default function HowItWorks() {
  return (
    <section
      className="max-w-7xl mx-auto mb-20"
      aria-labelledby="how-it-works-heading"
    >
      <h2
        id="how-it-works-heading"
        className="text-3xl font-bold text-gray-900 text-center mb-10"
      >
        How FlyFit Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-700">

        <HowItWorksCard
          stepNumber={1}
          title="Choose Your Trip Date"
          description="Select a date from the interactive calendar and preview weather forecasts directly on the calendar view."
        />

        <HowItWorksCard
          stepNumber={2}
          title="Check Destination Weather"
          description="Enter your destination to access real-time weather data powered by the Open-Meteo weather service."
        />

        <HowItWorksCard
          stepNumber={3}
          title="Get Outfit Suggestions"
          description="Receive personalized outfit recommendations tailored to your trip’s temperature, wind, UV, and precipitation conditions."
        />

      </div>
    </section>
  );
}