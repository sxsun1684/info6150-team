export async function getTripPlanAI(report) {
  const prompt = `
You are an expert travel planner.

Based on the following 14-day weather forecast JSON,
generate a structured travel plan in STRICT JSON format.

Weather JSON:
${JSON.stringify(report, null, 2)}

The output MUST be valid JSON and follow this structure exactly:

{
  "location": "string",
  "summary": "string",
  "bestDays": ["YYYY-MM-DD", "YYYY-MM-DD"],
  "days": [
    {
      "date": "YYYY-MM-DD",
      "weatherSummary": "string",
      "activity": "string",
      "outfit": "string",
      "warnings": "string",
      "photoScore": 1
    }
  ]
}

Rules:
- Output ONLY JSON.
- DO NOT include any explanation.
- DO NOT include comments.
- Always include 14 full entries in "days".
- "photoScore" must be between 1 and 10.
  `;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
    }),
  });

  const data = await res.json();

  const text = data.choices[0].message.content;

  try {
    return JSON.parse(text); // 解析 JSON
  } catch (err) {
    console.error("❌ error: ", err);
    return null;
  }
}
