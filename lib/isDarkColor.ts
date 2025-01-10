/** Take a Hex format */
export function isDarkColor(color: string) {
  if (!color.startsWith("#")) {
    throw new Error("Is not a valid hex code");
  }

  // Convert HEX color to RGB
  const hexToRgb = (hex: string) => {
    let sanitizedHex = hex.replace("#", "");

    /** If its a 3 character hex color */
    if (sanitizedHex.length === 3) {
      sanitizedHex = sanitizedHex
        .split("")
        .map((c) => c + c)
        .join("");
    }

    const bigint = parseInt(sanitizedHex, 16);

    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  // Calculate relative luminance
  type RGB = { r: number; g: number; b: number };
  const getLuminance = ({ r, g, b }: RGB) => {
    const normalize = (value: number) => {
      value /= 255;
      return value <= 0.03928
        ? value / 12.92
        : Math.pow((value + 0.055) / 1.055, 2.4);
    };
    const R = normalize(r);
    const G = normalize(g);
    const B = normalize(b);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B; // Weighted sum
  };

  // Determine luminance
  const luminance = getLuminance(hexToRgb(color));

  // Return true for dark, false for light
  return luminance < 0.5;
}
