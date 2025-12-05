import {getOutfitAdvice} from "../../utils/getOutfitAdvice";
import {Link} from "react-router-dom";

export default function TripSummary({weather}) {
    if (!weather) return null;

    const {date, daily, forecast14} = weather;

    // ----- Calculate outfit recommendations -----
    const outfitAdvice = getOutfitAdvice({
        tempMin: daily.tempMin,
        tempMax: daily.tempMax,
        wind: daily.wind,
        rain: daily.rain,
        uv: daily.uv,
    });

    // ----- Build chart -----
    const temps = forecast14.map((d) => d.tempMax);
    const max = Math.max(...temps);
    const min = Math.min(...temps);
    const normalize = (t) => ((t - min) / (max - min)) * 60;

    const points = forecast14
        .map((d, i) => `${i * 26},${70 - normalize(d.tempMax)}`)
        .join(" ");

    return (
        <article
            className="mt-12 p-8 rounded-xl border border-gray-200 bg-white shadow-sm"
            aria-labelledby="trip-summary-title"
        >
            {/* ---------- Header ---------- */}
            <header className="mb-6">
                <h2
                    id="trip-summary-title"
                    className="text-2xl font-semibold text-gray-900 tracking-tight"
                >
                    Trip Summary
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                    Weather overview for your selected travel date
                </p>
            </header>

            {/* ---------- Temperature section ---------- */}
            <section aria-label="Selected Date Weather" className="mb-8">
                <div className="flex items-end gap-4">
                    <p className="text-5xl font-light text-gray-900 leading-none drop-shadow-sm">
                        {daily.tempMax}°
                    </p>

                    <div className="text-gray-600 text-sm">
                        <p>Low: {daily.tempMin}°</p>
                        <p className="mt-1">
                            <time dateTime={date.toISOString()}>
                                {date.toDateString()}
                            </time>
                        </p>
                    </div>
                </div>
            </section>

            {/* ---------- Weather Metrics ---------- */}
            <section aria-label="Additional Weather Details">
                <dl className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm text-gray-700">
                    <Info label="UV Index" value={daily.uv}/>
                    <Info label="Wind" value={`${daily.wind} km/h`}/>
                    <Info label="Rain" value={`${daily.rain} mm`}/>
                    <Info label="Cloud Cover" value={`${daily.cloud}%`}/>
                    <Info label="Visibility" value="Requires hourly data"/>
                </dl>
            </section>

            {/* ---------- Outfit Suggestions ---------- */}
            <section aria-label="Outfit Recommendations" className="mt-10">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Outfit Recommendations
                </h3>

                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                    {outfitAdvice.map((tip, i) => (
                        <li key={i}>{tip}</li>
                    ))}
                </ul>
            </section>

            {/* Divider */}
            <hr className="border-gray-200 my-8"/>

            {/* ---------- Line Chart ---------- */}
            <section aria-label="14-day weather trend">
                <figure>
                    <figcaption className="text-lg font-medium text-gray-900 mb-3">
                        14-Day Temperature Trend
                    </figcaption>

                    <div className="w-full flex justify-center mt-2">
                        <svg width="380" height="120" className="overflow-visible">

                            {/* Y-axis labels */}
                            <text x="-10" y="20" textAnchor="end" className="fill-gray-500 text-xs">
                                {max}°
                            </text>
                            <text x="-10" y="110" textAnchor="end" className="fill-gray-500 text-xs">
                                {min}°
                            </text>

                            {/* Grid */}
                            <line x1="0" y1="20" x2="360" y2="20" stroke="#e5e7eb" strokeWidth="1"/>
                            <line x1="0" y1="110" x2="360" y2="110" stroke="#e5e7eb" strokeWidth="1"/>

                            {/* Polyline */}
                            <polyline
                                fill="none"
                                stroke="#2563eb"
                                strokeWidth="2"
                                strokeLinecap="round"
                                points={points}
                            />

                            {/* Dots */}
                            {forecast14.map((d, i) => (
                                <circle
                                    key={i}
                                    cx={i * 26}
                                    cy={70 - normalize(d.tempMax)}
                                    r="3"
                                    fill="#2563eb"
                                />
                            ))}

                            {/* X labels */}
                            {forecast14.map((d, i) =>
                                i % 3 === 0 ? (
                                    <text
                                        key={i}
                                        x={i * 26}
                                        y="130"
                                        textAnchor="middle"
                                        className="fill-gray-500 text-[10px]"
                                    >
                                        {new Date(d.date).getDate()}
                                    </text>
                                ) : null
                            )}
                        </svg>
                    </div>
                </figure>
            </section>

            {/* ---------- Footer ---------- */}
            <footer className="mt-10 flex justify-center">
                <Link
                    to="/explore"
                    className="px-5 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition rounded-lg"
                >
                    Explore
                </Link>
            </footer>

        </article>
    );
}

/* --- Info Component --- */
function Info({label, value}) {
    return (
        <div>
            <dt className="text-gray-500 text-xs mb-1">{label}</dt>
            <dd className="text-gray-900 font-medium">{value}</dd>
        </div>
    );
}
