export function formatDate(date: Date = new Date()): string {
    const suffix = (d: number) => ["th", "st", "nd", "rd"][(d % 10 > 3 || [11, 12, 13].includes(d)) ? 0 : d % 10];
    const months: string[] = ["Jan", "Feb ruary", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return ` ${day}${suffix(day)} ${months[month]}, ${year}  ${(hours % 12 || 12)}:${minutes.toString().padStart(2, "0")} ${hours < 12 ? "am" : "pm"}`;
}

export function friendlyTimeAgo(isoTimestamp: string): string {
    const date = new Date(isoTimestamp);
    const now = new Date();
  
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(seconds / 86400);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
  
    if (seconds < 60) {
      return "just now";
    } else if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else if (days === 1) {
      return "yesterday";
    } else if (days < 7) {
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    } else if (weeks < 5) {
      return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
    } else if (months < 3) {
      return `${months} month${months !== 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  }
  