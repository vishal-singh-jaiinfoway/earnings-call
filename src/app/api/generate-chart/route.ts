import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

export function buildPrompt({
  companies,
  graphType,
  prompt,
  companyData,
}: {
  companies: string[];
  graphType: string;
  prompt: string;
  companyData: Record<string, any>;
}) {
  return `
You are a financial data visualization assistant.

Given the following financial data:

${JSON.stringify(companyData, null, 2)}

Generate ONLY a JSON object with this structure:
\`\`\`\json
{
  "chartType": "bar" | "line" | "pie" | "doughnut",
  "data": {
    "labels": [...],
    "datasets": [...]
  },
  "options": { ... },
  "analysis": "string"
}
\`\`\`

Graph type to generate: "${graphType}".

Additional prompt: "${prompt}"

ONLY return the JSON. Do not include any explanation or markdown formatting.
`.trim();
}


export async function POST(req: NextRequest) {
  try {
    const { companies, graphType, prompt, companyData } = await req.json();

    if (!companies || !graphType || !companyData) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat:free",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            "You are a financial data analyst who returns valid Chart.js JSON.",
        },
        {
          role: "user",
          content: buildPrompt({ companies, graphType, prompt, companyData }),
        },
      ],
    });

    let content = completion.choices?.[0]?.message?.content ?? "";

    console.log("content",content)
    content = content.replace(/^\s*```json\s*|```$/g, "").trim();
    const parsed = JSON.parse(content);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("OpenAI /generate-chart error:", err);
    return NextResponse.json(
      { error: "Failed to generate chart" },
      { status: 500 }
    );
  }
}
