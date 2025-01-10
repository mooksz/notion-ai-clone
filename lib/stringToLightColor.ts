export const stringToLightColor = (str: string) => {
  let hash = 0;

  // Generate a hash from the string
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Ensure the generated color is light by controlling the RGB range
  const r = (hash >> 16) & 0xff; // Extract red component
  const g = (hash >> 8) & 0xff; // Extract green component
  const b = hash & 0xff; // Extract blue component

  // Adjust each component to ensure it's in the light range (128–255)
  const lightR = Math.floor(r / 2 + 128);
  const lightG = Math.floor(g / 2 + 128);
  const lightB = Math.floor(b / 2 + 128);

  // Convert to hexadecimal and return the color
  return `#${((1 << 24) + (lightR << 16) + (lightG << 8) + lightB)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
};
