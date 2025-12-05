export function getOutfitAdvice({tempMin, tempMax, wind, rain, uv}) {
    const recommendations = new Set(); // avoid duplicates

    // ---------------------------------------
    // 1. Compute Feels-Like Temperature
    // ---------------------------------------
    // simplified wind chill / heat index
    const feelsLike = tempMax - (wind >= 20 ? 3 : wind >= 10 ? 1.5 : 0);

    // ---------------------------------------
    // 2. Temperature-based clothing tiers
    // ---------------------------------------
    const tempScore =
        feelsLike >= 28 ? 5 :
            feelsLike >= 22 ? 4 :
                feelsLike >= 16 ? 3 :
                    feelsLike >= 10 ? 2 :
                        feelsLike >= 4 ? 1 : 0;

    const tempAdvice = {
        5: "Very warm — short sleeves and breathable fabrics.",
        4: "Warm — T-shirt or light long-sleeve is suitable.",
        3: "Mild — a light jacket or sweatshirt is recommended.",
        2: "Cool — a fleece or medium-weight jacket is good.",
        1: "Cold — wear a warm coat and layers.",
        0: "Very cold — heavy coat, gloves, and thermal layers required."
    };

    recommendations.add(tempAdvice[tempScore]);

    // ---------------------------------------
    // 3. Wind adjustments (refinement layer)
    // ---------------------------------------
    if (wind >= 35) recommendations.add("Strong wind — bring a windproof jacket.");
    else if (wind >= 20) recommendations.add("Windy — a windbreaker is recommended.");

    // ---------------------------------------
    // 4. Rain adjustments
    // ---------------------------------------
    const rainScore = rain >= 8 ? 2 : rain >= 2 ? 1 : 0;
    const rainAdvice = {
        2: "Expect rain — bring an umbrella and waterproof shoes.",
        1: "Light rain possible — pack a small umbrella.",
        0: null
    };
    if (rainAdvice[rainScore]) recommendations.add(rainAdvice[rainScore]);

    // ---------------------------------------
    // 5. UV adjustments
    // ---------------------------------------
    const uvScore = uv >= 7 ? 2 : uv >= 4 ? 1 : 0;
    const uvAdvice = {
        2: "High UV — sunscreen, sunglasses, and a hat are strongly recommended.",
        1: "Moderate UV — light sunscreen is advised."
    };
    if (uvAdvice[uvScore]) recommendations.add(uvAdvice[uvScore]);

    // ---------------------------------------
    // 6. Shoe Recommendation (smart logic)
    // ---------------------------------------
    if (rainScore === 2) {
        recommendations.add("Wear waterproof or non-slip shoes.");
    } else if (wind >= 25) {
        recommendations.add("Avoid loose footwear — choose stable walking shoes.");
    } else {
        recommendations.add("Comfortable walking shoes are recommended.");
    }

    // ---------------------------------------
    // 7. Layering hint if daily shift is big
    // ---------------------------------------
    if (tempMax - tempMin >= 10) {
        recommendations.add("Temperature varies through the day — dress in layers.");
    }

    return Array.from(recommendations);
}
