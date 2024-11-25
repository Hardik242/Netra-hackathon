export function formatDateTime(dateTimeString) {
    // Parse the input string into a Date object
    const date = new Date(dateTimeString);

    // Get the year, month, day, hours, minutes, and seconds
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    // Pad month with leading zero if needed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const shortDateFormat = `${day}-${month}-${year}`;
    const shortTimeFormat = `${hours}:${minutes}:${seconds}`;
    const combinedFormat = `${shortDateFormat} ${shortTimeFormat}`;

    return {
        shortDate: shortDateFormat,
        shortTime: shortTimeFormat,
        combined: combinedFormat,
    };
}
