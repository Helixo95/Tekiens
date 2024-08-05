/**
 * Function to darken a color with a set amount
 * @param hex the color we want to darken
 * @param amount the amount we want to darken the color
 * @returns the new darker color
 */
export const darkenColor = (hex: string | undefined, amount = 20) => {
    if (hex) {

        hex = hex.slice(1);

        let num = parseInt(hex, 16);

        let r = (num >> 16) - amount;
        let g = ((num >> 8) & 0x00FF) - amount;
        let b = (num & 0x0000FF) - amount;

        r = Math.max(r, 0);
        g = Math.max(g, 0);
        b = Math.max(b, 0);

        return "#" + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
    }

    return '#000000';
}

/**
 * Function to brighten a color with a set amount
 * @param hex the color we want to brighten
 * @param amount the amount we want to brighten the color
 * @returns the new brighter color
 */
export const brightenColor = (hex: string | undefined, amount = 100) => {
    if (hex) {

        hex = hex.slice(1);

        let num = parseInt(hex, 16);

        let r = (num >> 16) + amount;
        let g = ((num >> 8) & 0x00FF) + amount;
        let b = (num & 0x0000FF) + amount;

        r = Math.max(r, 0);
        g = Math.max(g, 0);
        b = Math.max(b, 0);

        return "#" + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
    }

    return '#000000';
}

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