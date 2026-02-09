// import { NextRequest, NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// const PROMPT = `You are an AI Trip Planner Agent 'Wander AI'. Your goal is to help the user plan a trip by **asking one relevant trip-related question at a time**.

// Only ask questions about the following details in order: 
// 1. Starting location (source) 
// 2. Destination city or country 
// 3. Group size (Solo, Couple, Family, Friends) 
// 4. Budget (Low, Medium, High) 
// 5. Trip duration (number of days) 
// 6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation) 
// 7. Special requirements or preferences (if any)

// If any answer is missing or unclear, politely ask the user to clarify.
// Along with response also send which ui component to display for generative UI.

// Output MUST be a single JSON object with this schema:
// {
//   "resp": "Text Response Here",
//   "ui": "budget/groupSize/tripDuration/final"
// }`;

// export async function POST(req: NextRequest) {
//   try {
//     const { messages } = await req.json();

//     const model = genAI.getGenerativeModel({
//      // model: "gemini-2.5-flash", 
//      model: "gemini-1.5-flash",
//       // CRITICAL FIX: This forces the AI to ONLY reply in JSON
//       generationConfig: { responseMimeType: "application/json" } 
//     });

//     const conversation = messages
//       .map((m: any) => `${m.role}: ${m.content}`)
//       .join("\n");

//     const result = await model.generateContent(`
//       ${PROMPT}
      
//       Conversation so far:
//       ${conversation}
//     `);

//     const responseText = result.response.text();
    
//     // No regex needed anymore because "responseMimeType" handles it
//     return NextResponse.json(JSON.parse(responseText));

//   } catch (error: any) {
//     console.error("Gemini error:", error);
    
//     // Fallback if AI fails (prevents app crash)
//     return NextResponse.json({ 
//         resp: "I'm having trouble processing that. Could you try again?", 
//         ui: "" 
//     });
//   }
// }

//################################3

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const PROMPT = `You are an AI Trip Planner Agent 'Wander AI'. Your goal is to help the user plan a trip by **asking one relevant trip-related question at a time**.
**PHASE 1: COLLECTION**
Ask these questions one by one. Do not move to the next until the current one is answered. Or if user says source and destination in one message, then ask for group size next.
1. Starting location
2. Destination.
3. Group size (Solo, Couple, Family, Friends) -> Set json 'ui' to 'groupSize'
4. Budget (Low, Medium, High) -> Set json 'ui' to 'budget'
5. Trip duration (days) -> Set json 'ui' to 'tripDuration'
6. Travel interests | user can say none,no, or nothing to skip -> Set json 'ui' to 'TravelInterests'
7. Special requirements (if any) | user can say none,no, or nothing to skip -> Set json 'ui' to 'SpecialRequirements'

**PHASE 2: GENERATION (CRITICAL)**
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
As soon as the user answers the last question (Question 7), or if they say "nothing" / "no preferences":
1. YOU MUST STOP ASKING QUESTIONS.
2. YOU MUST IMMEDIATELY GENERATE THE FULL DAY-BY-DAY ITINERARY.
3. Set the json 'ui' field to 'Final'.
4. Do NOT say "Okay, I will start". Just output the itinerary in the 'resp' field.

**JSON SCHEMA:**
Always reply in this strict JSON format:
{
  "resp": "Your text response or the full itinerary markdown here",
  "ui": "current_ui_component_name_or_Final"
}`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // ✅ USING GEMMA 3 12B (High Quota Model)
    // ID comes from your previous JSON list: "models/gemma-3-12b-it"
    const model = genAI.getGenerativeModel({
      model: "gemma-3-12b-it", 
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

    // Gemma might wrap the JSON in markdown blocks (e.g., ```json ... ```)
    // We clean it up manually to prevent crashes.
    const cleanedText = responseText.replace(/```json|```/g, "").trim();

    return NextResponse.json(JSON.parse(cleanedText));

  } catch (error: any) {
    console.error("Model Error:", error);
    
    // Detailed error handling
    if (error.message.includes("429")) {
        return NextResponse.json({ 
            resp: "⏳ Rate limit reached. Please wait a few seconds.", 
            ui: "" 
        });
    }

    return NextResponse.json({ 
        resp: "I'm having trouble connecting. Please try again.", 
        ui: "" 
    });
  }
}
// Note: The above code is designed to work with Google's Gemini models. Make sure to adjust the model name and parameters based on your specific use case and the models available in your Google Cloud project.