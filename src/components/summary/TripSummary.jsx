import {getOutfitAdvice} from "../../utils/getOutfitAdvice";

export default function TripSummary({weather}) {
    // const navigate = useNavigate();
    if (!weather) return null;

    const {date, daily, forecast14} = weather;


    // Outfit recommendations
    const outfitAdvice = getOutfitAdvice({
        tempMin: daily.tempMin,
        tempMax: daily.tempMax,
        wind: daily.wind,
        rain: daily.rain,
        uv: daily.uv,
    });


    // Chart calculations
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
            {/* Header */}
            <header className="mb-8">
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

            {/*  Selected Date Weather */}
            <section aria-label="Selected Date Weather" className="mb-10">
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

            {/* ---------- Weather Details ---------- */}
            <Section title="Weather Details">
                <dl className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm text-gray-700">
                    <Info label="UV Index" value={daily.uv}/>
                    <Info label="Wind" value={`${daily.wind} km/h`}/>
                    <Info label="Rain" value={`${daily.rain} mm`}/>
                    <Info label="Cloud Cover" value={`${daily.cloud}%`}/>
                    <Info label="Visibility" value="Requires hourly data"/>
                </dl>
            </Section>

            {/* ---------- Outfit Recommendations ---------- */}
            <Section title="Outfit Recommendations">
                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                    {outfitAdvice.map((tip, i) => (
                        <li key={i}>{tip}</li>
                    ))}
                </ul>
            </Section>

            <hr className="border-gray-200 my-10"/>

            {/* ---------- Temperature Chart ---------- */}
            <Section title="14-Day Temperature Trend">
                <figure
                    role="figure"
                    aria-labelledby="temp-trend-title"
                    className="w-full flex flex-col items-center"
                >
                    <figcaption
                        id="temp-trend-title"
                        className="text-gray-700 text-sm mb-3"
                    >
                        Temperature forecast for the next 14 days
                    </figcaption>

                    <svg
                        width="400"
                        height="140"
                        viewBox="0 0 400 140"
                        className="overflow-visible"
                    >
                        {/* ----------- GRADIENT DEFINITION ----------- */}
                        <defs>
                            <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#60a5fa"/>
                                {/* light blue */}
                                <stop offset="50%" stopColor="#3b82f6"/>
                                {/* blue */}
                                <stop offset="100%" stopColor="#f87171"/>
                                {/* soft red */}
                            </linearGradient>
                        </defs>

                        {/* ----------- GRID LINES ----------- */}
                        <line x1="40" y1="30" x2="380" y2="30" stroke="#e5e7eb"/>
                        <line x1="40" y1="110" x2="380" y2="110" stroke="#e5e7eb"/>

                        {/* ----------- Y-AXIS LABELS ----------- */}
                        <text x="35" y="34" textAnchor="end" className="fill-gray-500 text-xs">
                            {max}°
                        </text>
                        <text x="35" y="114" textAnchor="end" className="fill-gray-500 text-xs">
                            {min}°
                        </text>

                        {/* ----------- GRADIENT LINE ----------- */}
                        <polyline
                            fill="none"
                            stroke="url(#tempGradient)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            points={points}
                            transform="translate(40, 10)"
                        />

                        {/* ----------- Dots ----------- */}
                        {/*{forecast14.map((d, i) => (*/}
                        {/*    <circle*/}
                        {/*        key={i}*/}
                        {/*        cx={i * 26 + 40}*/}
                        {/*        cy={80 - normalize(d.tempMax) + 10}*/}
                        {/*        r="3"*/}
                        {/*        fill="url(#tempGradient)"*/}
                        {/*    />*/}
                        {/*))}*/}

                        {/* ----------- X-axis Labels ----------- */}
                        {forecast14.map((d, i) =>
                            i % 3 === 0 ? (
                                <text
                                    key={i}
                                    x={i * 26 + 40}
                                    y="135"
                                    textAnchor="middle"
                                    className="fill-gray-500 text-[10px]"
                                >
                                    {new Date(d.date).getDate()}
                                </text>
                            ) : null
                        )}
                    </svg>
                </figure>
            </Section>


            {/* ---------- Footer ---------- */}
            {/*TODO: do not delete*/}
            {/*<button*/}
            {/*    className="mt-6 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"*/}
            {/*    onClick={() => navigate("/explore", {state: {weather}})}*/}
            {/*>*/}
            {/*    Generate Travel Plan*/}
            {/*</button>*/}

        </article>
    );
}

/* ------------------ Reusable Section ------------------ */
function Section({title, children}) {
    return (
        <section className="mt-10">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
            {children}
        </section>
    );
}

/* ------------------ Info Component ------------------ */
function Info({label, value}) {
    return (
        <div>
            <dt className="text-gray-500 text-xs mb-1">{label}</dt>
            <dd className="text-gray-900 font-medium">{value}</dd>
        </div>
    );
}
