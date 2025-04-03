import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

// Enable streaming with AI response
export async function POST(req) {
  try {
    const { query ,selectedCompanies,selectedYear,selectedQuarter,selectedPersona} = await req.json();

    // Create AI completion with streaming enabled
    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-small-3.1-24b-instruct:free",
      messages: [
        {
            role:"system",
            content:"You are a financial expert AI assistant.You answer questions related to earnings call of companies,and other financial things.If the user prompt is not clear enough,you ask user to make their prompt more clear.You politely decline any question out of financial domain."
        },
        {
          role: "user",
          content: query,
        },
      ],
      stream: true, // Enable streaming
    });

    // Create a ReadableStream to push chunks to client
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of completion) {
          // Send streamed content as JSON chunks
          const text = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(`data: ${JSON.stringify({ text })}\n\n`);
        }
        controller.close(); // Close stream after completion
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return NextResponse.json(
      { error: "Failed to fetch response" },
      { status: 500 }
    );
  }
}
