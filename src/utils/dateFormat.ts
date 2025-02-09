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
