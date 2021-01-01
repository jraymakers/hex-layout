# Hex Layout

A TypeScript library for calculating hexagonal layouts.

## Example

```typescript
// Select a distance between centers of adjacent hexes.
const centerToCenterDistance = 100;

// Shift the 0,0 hex to lie entirely within the positive x,y quadrant.
const origin = new Vector(centerToCenterDistance / 2, centerToCenterDistance / Math.sqrt(3));

// Align the q axis, the first hexagonal axis, with the x axis.
const qAxisAngle = 0;

// Set the r axis, the secon hexagonal axis, to be 60° clockwise of the q axis.
const rAxisClockwise = true;

// Create a layout using the above settings.
const layout = new HexLayout({
  centerToCenterDistance,
  origin,
  qAxisAngle,
  rAxisClockwise,
});

// Create 8 rows of alternating 8 and 7 seven hexes:
//
//    0,0 hex
//   /
//  *   *   *   *   *   *   *   *  --  q axis
//    *   *   *   *   *   *   *
//  *   *   *   *   *   *   *   *
//    *   *   *   *   *   *   *
//  *   *   *   *   *   *   *   *
//    *   *   *   *   *   *   *
//  *   *   *   *   *   *   *   *
//    *   *   *   *   *   *   *
//                 \
//                  r axis
//
const hexes: Hex[] = [];
for (let r = 0; r < 8; r++) {
  for (let c = 0; c < 8 - r%2; c++) {
    hexes.push(new Hex(c - Math.floor(r/2), r));
  }
}

// Calculate the bounds of the hexes.
// Useful for sizing a display (e.g. an SVG element).
const bounds = layout.bounds(hexes);
const width = bounds.width();
const height = bounds.height();

// Calculate the x,y coordinates of the center of each hex.
const centers = hexes.map((hex) => layout.centerOfHex(hex));

// Calculate the corners of each hex.
const boundaries = hexes.map((hex) => layout.cornersOfHex(hex));

// Determine which hex a given point lies in.
const hex = layout.hexFromPoint(new Vector(x,y));
```
