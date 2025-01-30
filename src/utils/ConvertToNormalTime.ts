export const convertToNormalTime = (isoTime: string) => {
  // Parse the ISO string into a Date object
  const date = new Date(isoTime);

  // Define options for formatting
  const options: Intl.DateTimeFormatOptions = {
    // day: "2-digit",
    // month: "short", // Short month name (e.g., "Dec")
    // year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false // Use 12-hour format
  };

  // Format the date and time
  return date.toLocaleString("en-US", options);
}