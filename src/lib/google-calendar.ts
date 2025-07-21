import { ParsedMeeting } from "./ai-parser";

export interface MeetingDetails {
  title: string;
  startTime: string;
  endTime: string;
  attendees: string[];
  description: string;
  location?: string;
}

export function createGoogleCalendarUrl(details: MeetingDetails): string {
  const formatDate = (isoDate: string) => {
    return (
      new Date(isoDate).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    );
  };

  const startTime = formatDate(details.startTime);
  const endTime = formatDate(details.endTime);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: details.title,
    dates: `${startTime}/${endTime}`,
    details: details.description,
    location: details.location || "",
  });

  return `https://calendar.google.com/calendar/render?${params}`;
}

// Helper function to convert ParsedMeeting to MeetingDetails
export function adaptParsedToCalendar(
  parsed: ParsedMeeting,
  prompt: string
): MeetingDetails {
  // Calculate actual dates
  const today = new Date();
  const meetingDate = parsed.date ? new Date(parsed.date) : today;

  // Parse time (default 9 AM if not specified)
  const timeStr = parsed.time || "09:00";
  const [hours, minutes] = timeStr.split(":").map(Number);

  const startDateTime = new Date(meetingDate);
  startDateTime.setHours(hours, minutes, 0, 0);

  const endDateTime = new Date(startDateTime);
  endDateTime.setMinutes(startDateTime.getMinutes() + (parsed.duration || 60));

  return {
    title: parsed.title || "Meeting",
    startTime: startDateTime.toISOString(),
    endTime: endDateTime.toISOString(),
    attendees: parsed.attendees || [],
    description: parsed.description || prompt,
    location: parsed.location,
  };
}
