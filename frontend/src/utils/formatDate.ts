export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString("de-DE",
    {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    });
}