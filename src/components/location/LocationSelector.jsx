import { useState, useEffect, useRef } from "react";

export default function LocationSelector({ onLocationSelect }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [highlighted, setHighlighted] = useState(-1);

    const debounceRef = useRef(null);

    // Fetch cities
    const fetchCities = async (name) => {
        if (!name.trim()) {
            setResults([]);
            return;
        }
        setLoading(true);

        const res = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=8`
        );
        const data = await res.json();

        setResults(data.results || []);
        setLoading(false);
    };

    // Debounce input
    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => fetchCities(query), 280);
    }, [query]);

    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (!results.length) return;

        if (e.key === "ArrowDown") {
            setHighlighted((prev) => (prev < results.length - 1 ? prev + 1 : 0));
        } else if (e.key === "ArrowUp") {
            setHighlighted((prev) => (prev > 0 ? prev - 1 : results.length - 1));
        } else if (e.key === "Enter" && highlighted >= 0) {
            selectCity(results[highlighted]);
        }
    };

    const selectCity = (city) => {
        const name = `${city.name}, ${city.country}`;
        onLocationSelect({
            name,
            lat: city.latitude,
            lon: city.longitude,
        });
        setQuery(name);
        setResults([]);
        setHighlighted(-1);
    };

    return (
        <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Choose Location
            </h2>

            <div className="relative">
                {/* Input */}
                <div
                    className="
                    relative w-full
                    rounded-2xl
                    bg-white backdrop-blur-sm
                    shadow-sm
                    ring-1 ring-gray-200
                    focus-within:ring-blue-500
                    transition
                "
                >
                    {/* search icon */}
                    <svg
                        className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <circle cx="11" cy="11" r="7" />
                        <line x1="16.5" y1="16.5" x2="21" y2="21" />
                    </svg>

                    <input
                        className="
                        w-full py-3 pl-12 pr-4
                        bg-transparent
                        text-gray-900
                        placeholder-gray-400
                        outline-none
                        rounded-2xl
                    "
                        placeholder="Search city or country"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                {/* Dropdown */}
                {results.length > 0 && (
                    <ul
                        className="
                        absolute z-20 w-full mt-2
                        bg-white
                        rounded-2xl
                        shadow-lg
                        border border-gray-200
                        overflow-hidden
                        divide-y divide-gray-100
                    "
                    >
                        {results.map((city, i) => (
                            <li
                                key={city.id}
                                className={`
                                    px-4 py-3 cursor-pointer
                                    transition
                                    ${highlighted === i ? "bg-blue-50" : "hover:bg-gray-50"}
                                `}
                                onMouseEnter={() => setHighlighted(i)}
                                onClick={() => selectCity(city)}
                            >
                                <p className="text-gray-900 font-medium">
                                    {city.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {city.country}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Loading */}
                {loading && (
                    <p className="mt-2 text-sm text-gray-400">Searching...</p>
                )}

                {/* Empty state */}
                {!loading && query.trim() && results.length === 0 && (
                    <p className="mt-2 text-sm text-gray-400">No results found</p>
                )}
            </div>
        </section>
    );
}
