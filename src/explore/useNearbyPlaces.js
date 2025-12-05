import {useEffect, useState} from "react";

export function useNearbyPlaces(lat, lon, type = "tourist_attraction") {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!lat || !lon) return;

        async function fetchData() {
            setLoading(true);
            const res = await fetch(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json
        ?location=${lat},${lon}
        &rankby=distance
        &type=${type}
        &key=YOUR_API_KEY`
            );

            const data = await res.json();
            setPlaces(data.results || []);
            setLoading(false);
        }

        fetchData();
    }, [lat, lon, type]);

    return {places, loading};
}
