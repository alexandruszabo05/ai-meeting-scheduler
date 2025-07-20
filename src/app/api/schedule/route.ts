import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 API route called");
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    console.log("🤖 Parsing with AI:", prompt);
    const { parseMeetingPrompt } = await import("@/lib/ai-parser");
    const meetingDetails = await parseMeetingPrompt(prompt);
    console.log("✅ Parsed result:", meetingDetails);

    // Here you would integrate with:
    // 1. OpenAI API to parse the meeting details from the prompt
    // 2. Google Calendar API to create the meeting

    // Simulated AI processing

    // Simulated Google Calendar integration
    // const calendarEvent = await createGoogleCalendarEvent(meetingDetails)

    return NextResponse.json({
      success: true,
      message: "Meeting scheduled successfully",
      details: meetingDetails,
    });
  } catch (error) {
    console.error("Error scheduling meeting:", error);
    return NextResponse.json(
      { error: "Failed to schedule meeting" },
      { status: 500 }
    );
  }
}
