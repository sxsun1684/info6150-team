import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {getTripPlanAI} from "../utils/getTripPlanAI";

export default function ExplorePage() {
    const {state} = useLocation();
    const weather = state?.weather;

    const [plan, setPlan] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPlan() {
            if (!weather) return;

            const report = {
                location: weather.locationName ?? "Selected Location",
                selectedDate: weather.date.toISOString().split("T")[0],
                today: weather.daily,
                next14days: weather.forecast14
            };

            const result = await getTripPlanAI(report);
            setPlan(result);
            setLoading(false);
        }

        loadPlan();
    }, [weather]);

    if (!weather) {
        return (
            <div className="p-10 text-center text-gray-600">
                No weather data received.
            </div>
        );
    }

    return (
        <main className="max-w-3xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                ✨ AI Travel Plan for {weather.locationName ?? "Your Destination"}
            </h1>

            {loading ? (
                <p className="text-gray-500">Generating your personalized travel plan...</p>
            ) : (
                <article className="mt-6 p-6 bg-white shadow border rounded-xl">
                    <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                        {plan && (
                            <div className="space-y-6 mt-6">

                                <section className="p-6 bg-white shadow rounded-xl">
                                    <h2 className="text-xl font-semibold">{plan.location}</h2>
                                    <p className="text-gray-600 mt-2">{plan.summary}</p>

                                    <p className="mt-4 text-gray-800 font-medium">
                                        Best Days: {plan.bestDays.join(", ")}
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    {plan.days.map((d) => (
                                        <div
                                            key={d.date}
                                            className="p-5 bg-white border rounded-xl shadow-sm"
                                        >
                                            <h3 className="font-semibold text-lg">{d.date}</h3>
                                            <p className="text-gray-600">{d.weatherSummary}</p>

                                            <p className="mt-2"><strong>Activity:</strong> {d.activity}</p>
                                            <p><strong>Outfit:</strong> {d.outfit}</p>
                                            <p><strong>Warnings:</strong> {d.warnings}</p>

                                            <p className="mt-2 text-purple-600 font-medium">
                                                Photo Score: {d.photoScore}/10
                                            </p>
                                        </div>
                                    ))}
                                </section>

                            </div>
                        )}

                    </pre>
                </article>
            )}

        </main>
    );
}
