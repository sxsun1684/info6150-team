import {ResponsiveLine} from "@nivo/line";

export default function WeatherChart({hourly}) {
    if (!hourly || !hourly.time) return null;

    // Convert HH:MM time labels
    const labels = hourly.time.map((t) => t.slice(11, 16));

    // Format into Nivo dataset
    const data = [
        {
            id: "Temperature (°C)",
            color: "#3b82f6",
            data: labels.map((time, i) => ({
                x: time,
                y: hourly.temp[i],
            })),
        },
        {
            id: "Wind Speed (m/s)",
            color: "#10b981",
            data: labels.map((time, i) => ({
                x: time,
                y: hourly.wind[i],
            })),
        },
        {
            id: "Humidity (%)",
            color: "#6366f1",
            data: labels.map((time, i) => ({
                x: time,
                y: hourly.humidity[i],
            })),
        },
    ];

    return (
        <div style={{height: 300}}>
            <ResponsiveLine
                data={data}
                margin={{top: 50, right: 90, bottom: 50, left: 60}}
                xScale={{type: "point"}}
                yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: false,
                    reverse: false,
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickRotation: -35,
                    legend: "Time (HH:MM)",
                    legendOffset: 40,
                    legendPosition: "middle",
                }}
                axisLeft={{
                    legend: "Value",
                    legendOffset: -50,
                    legendPosition: "middle",
                }}
                colors={{datum: "color"}}
                pointSize={6}
                pointBorderWidth={1}
                pointBorderColor="#fff"
                pointLabelYOffset={-12}
                useMesh={true}
                enableSlices="x"
                theme={{
                    tooltip: {container: {background: "#ffffff", color: "#333"}},
                }}
            />
        </div>
    );
}
