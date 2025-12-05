import {useState, useEffect} from "react";

export default function LocationSelector({onLocationSelect}) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [typingTimeout, setTypingTimeout] = useState(null);

    // Fetch cities from Open-Meteo Geocoding API
    const fetchCities = async (name) => {
        if (!name.trim()) {
            setResults([]);
            return;
        }

        const res = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=8`
        );
        const data = await res.json();
        setResults(data.results || []);
    };

    // Debounce search — wait until user stops typing for 300ms
    useEffect(() => {
        if (typingTimeout) clearTimeout(typingTimeout);

        const timeout = setTimeout(() => {
            fetchCities(query);
        }, 300);

        setTypingTimeout(timeout);
    }, [query]);

    return (
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Choose Location</h2>

            <input
                className="border p-2 rounded w-full"
                placeholder="Enter city, country…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {/* Dropdown List */}
            {results.length > 0 && (
                <ul className="mt-2 border rounded bg-white shadow-lg max-h-60 overflow-auto">
                    {results.map((city) => (
                        <li
                            key={city.id}
                            className="p-2 hover:bg-blue-50 cursor-pointer flex flex-col"
                            onClick={() => {
                                onLocationSelect({
                                    name: `${city.name}, ${city.country}`,
                                    lat: city.latitude,
                                    lon: city.longitude,
                                });
                                setResults([]);
                                setQuery(`${city.name}, ${city.country}`);
                            }}
                        >
                            <span className="font-medium">{city.name}</span>
                            <span className="text-sm text-gray-500">{city.country}</span>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
