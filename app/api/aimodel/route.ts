import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const PROMPT = `You are an AI Trip Planner Agent 'Wander AI'. Your goal is to help the user plan a trip by **asking one relevant trip-related question at a time**.

Only ask questions about the following details in order: 
1. Starting location (source) 
2. Destination city or country 
3. Group size (Solo, Couple, Family, Friends) 
4. Budget (Low, Medium, High) 
5. Trip duration (number of days) 
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation) 
7. Special requirements or preferences (if any)

If any answer is missing or unclear, politely ask the user to clarify.
Along with response also send which ui component to display for generative UI.

Output MUST be a single JSON object with this schema:
{
  "resp": "Text Response Here",
  "ui": "budget/groupSize/TripDuration/Final"
}`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", 
      // CRITICAL FIX: This forces the AI to ONLY reply in JSON
      generationConfig: { responseMimeType: "application/json" } 
    });

    const conversation = messages
      .map((m: any) => `${m.role}: ${m.content}`)
      .join("\n");

    const result = await model.generateContent(`
      ${PROMPT}
      
      Conversation so far:
      ${conversation}
    `);

    const responseText = result.response.text();
    
    // No regex needed anymore because "responseMimeType" handles it
    return NextResponse.json(JSON.parse(responseText));

  } catch (error: any) {
    console.error("Gemini error:", error);
    
    // Fallback if AI fails (prevents app crash)
    return NextResponse.json({ 
        resp: "I'm having trouble processing that. Could you try again?", 
        ui: "" 
    });
  }
}