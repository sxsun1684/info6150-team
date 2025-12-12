import travelImg from "../../assets/outdoor.png";
import globeImg from "../../assets/globe.png";
import luggageImg from "../../assets/luggage.png";
import ideaImg from "../../assets/idea.png";

import WhyWeCard from "./WhyWeCard";

export default function WhyWe() {
    return (
        <section className="max-w-7xl mx-auto text-center mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">
                Why Choose GoodTrip?
            </h2>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <WhyWeCard
                    imgSrc={travelImg}
                    imgAlt="Travel icon"
                    text="Designed specifically for travelers who need fast, reliable weather insights."
                />

                <WhyWeCard
                    imgSrc={globeImg}
                    imgAlt="Globe icon"
                    text="Powered by accurate and globally-supported Open-Meteo API."
                />

                <WhyWeCard
                    imgSrc={luggageImg}
                    imgAlt="Luggage icon"
                    text="Helps you pack smarter with personalized outfit suggestions."
                />

                <WhyWeCard
                    imgSrc={ideaImg}
                    imgAlt="Idea icon"
                    text="Simple, intuitive interface perfect for trip planning."
                />

            </ul>
        </section>
    );
}