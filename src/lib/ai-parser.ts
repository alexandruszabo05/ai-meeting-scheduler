import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ParsedMeeting {
  title?: string;
  date?: string;
  time?: string;
  duration?: number;
  attendees?: string[];
  location?: string;
  description?: string;
}

export async function parseMeetingPrompt(
  prompt: string
): Promise<ParsedMeeting> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Today's date is ${
            new Date().toISOString().split("T")[0]
          }. Extract meeting details from natural language. Return ONLY valid JSON:
          {
            "title": "meeting title",
            "date": "YYYY-MM-DD", 
            "time": "HH:MM",
            "duration": minutes_as_number,
            "attendees": ["Name1", "Name2"],
            "location": "location or null",
            "description": "summary"
          }
          
          For relative dates like "tomorrow", "next week", calculate from today's date.
          For attendees, extract NAMES only, not emails. Example:
          "Meeting with John and Sarah" → "attendees": ["John", "Sarah"]`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return JSON.parse(completion.choices[0].message.content || "{}");
  } catch (error) {
    console.error("AI parsing error:", error);
    return { description: prompt };
  }
}
