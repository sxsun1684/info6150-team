import { useEffect, useState } from "react";

export default function ExplorePage() {
    const [location, setLocation] = useState(null);
    const [attractions, setAttractions] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_KEY = "YOUR_GOOGLE_PLACES_API_KEY";

    // 1) get current position
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocation({
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude,
                });
            },
            () => {
                // fallback 默认旧金山
                setLocation({
                    lat: 37.7749,
                    lon: -122.4194,
                });
            }
        );
    }, []);

    // 2) when location accessible，fetch landscapes & cafe
    useEffect(() => {
        if (!location) return;

        async function fetchData() {
            setLoading(true);

            const { lat, lon } = location;

            const attractionURL =
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json` +
                `?location=${lat},${lon}&rankby=distance&type=tourist_attraction&key=${API_KEY}`;

            const restaurantURL =
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json` +
                `?location=${lat},${lon}&rankby=distance&type=restaurant&key=${API_KEY}`;

            const res1 = await fetch(attractionURL);
            const data1 = await res1.json();

            const res2 = await fetch(restaurantURL);
            const data2 = await res2.json();

            setAttractions(data1.results || []);
            setRestaurants(data2.results || []);
            setLoading(false);
        }

        fetchData();
    }, [location]);


    // ---------------- UI ----------------
    return (
        <main className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Explore Nearby</h1>

            {!location && <p>Detecting your location...</p>}
            {loading && location && <p>Loading nearby places…</p>}

            {/* 景点 */}
            {!loading && (
                <section className="mb-10">
                    <h2 className="text-xl font-semibold mb-2">Tourist Attractions</h2>
                    <ul className="space-y-2">
                        {attractions.map((p) => (
                            <li key={p.place_id} className="border p-3 rounded">
                                <p className="font-semibold">{p.name}</p>
                                <p className="text-gray-600 text-sm">{p.vicinity}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* 餐厅 */}
            {!loading && (
                <section>
                    <h2 className="text-xl font-semibold mb-2">Restaurants</h2>
                    <ul className="space-y-2">
                        {restaurants.map((p) => (
                            <li key={p.place_id} className="border p-3 rounded">
                                <p className="font-semibold">{p.name}</p>
                                <p className="text-gray-600 text-sm">{p.vicinity}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </main>
    );
}
