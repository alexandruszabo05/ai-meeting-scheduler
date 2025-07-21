import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("🚀 API route called");

  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // AI Parsing
    console.log("🤖 Parsing with AI:", prompt);
    const { parseMeetingPrompt } = await import("@/lib/ai-parser");
    const parsedMeeting = await parseMeetingPrompt(prompt);
    console.log("✅ Parsed result:", parsedMeeting);

    // Convert to Calendar format
    const { adaptParsedToCalendar, createGoogleCalendarUrl } = await import(
      "@/lib/google-calendar"
    );
    const meetingDetails = adaptParsedToCalendar(parsedMeeting, prompt);
    const calendarUrl = createGoogleCalendarUrl(meetingDetails);

    console.log("📅 Calendar URL generated:", calendarUrl);

    return NextResponse.json({
      success: true,
      message: "Meeting ready for calendar!",
      details: meetingDetails,
      calendarUrl: calendarUrl,
    });
  } catch (error) {
    console.error("Error scheduling meeting:", error);
    return NextResponse.json(
      { error: "Failed to schedule meeting" },
      { status: 500 }
    );
  }
}
