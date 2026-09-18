export const SEAT_POSITIONS = [
  // Left side seats (z = -1.1)
  { x: -3.5, y: 0.55, z: -1.1, side: 'left', index: 0 },
  { x: -1.5, y: 0.55, z: -1.1, side: 'left', index: 1 },
  { x: 0.5, y: 0.55, z: -1.1, side: 'left', index: 2 },
  { x: 2.5, y: 0.55, z: -1.1, side: 'left', index: 3 },
  // Right side seats (z = 1.1)
  { x: -3.5, y: 0.55, z: 1.1, side: 'right', index: 4 },
  { x: -1.5, y: 0.55, z: 1.1, side: 'right', index: 5 },
  { x: 0.5, y: 0.55, z: 1.1, side: 'right', index: 6 },
  { x: 2.5, y: 0.55, z: 1.1, side: 'right', index: 7 },
];

export const HANDRAIL_POLE_POSITIONS = [
  { x: -2.5, z: 0 },
  { x: -0.5, z: 0 },
  { x: 1.5, z: 0 },
];

export function getNPCsPerLoop(loopNumber) {
  if (loopNumber === 0) return 3;
  if (loopNumber === 1) return 4;
  if (loopNumber === 2) return 5;
  if (loopNumber >= 3) return 6;
  return 3;
}

export function getSeatsForNPCCount(count) {
  const availableSeats = SEAT_POSITIONS.slice();
  const selectedSeats = [];
  
  // Simple shuffle
  for (let i = availableSeats.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableSeats[i], availableSeats[j]] = [availableSeats[j], availableSeats[i]];
  }

  for (let i = 0; i < count && i < availableSeats.length; i++) {
    selectedSeats.push(availableSeats[i]);
  }
  return selectedSeats;
}
