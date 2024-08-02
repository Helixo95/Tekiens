/**
 * Function to return true or false if a color is dark or not
 * @param color the color we want to inspect
 * @returns true if the color is dark and false if not
 */
export const isColorDark = (color: string | undefined) => {
    if (!color) {
        return false
    }

    // Extract the RGB components from the hex color
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    // Calculate brightness
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return true if the color is dark
    return brightness < 0.15;
}