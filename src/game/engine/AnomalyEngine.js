import { ANOMALY_TYPES, getAnomalyPoolForLoop } from '../data/anomalyTypes.js';
import { SEAT_POSITIONS, getSeatsForNPCCount } from '../data/carLayouts.js';

export default class AnomalyEngine {
  constructor() {
    this.currentAnomaly = null; // { type, seatIndex, npcRef }
    this.loopNumber = 0;
  }
  
  generateLayout(loopNumber) {
    this.loopNumber = loopNumber;
    
    // Determine NPC count: 3 for loops 0-2, 4 for 3-5, 5 for 6-8, 6 for 9+
    const npcCount = this._getNPCCount(loopNumber);
    
    // Get available seats
    const seats = getSeatsForNPCCount(npcCount);
    
    // Select anomaly type from difficulty pool
    const pool = getAnomalyPoolForLoop(loopNumber);
    const anomalyType = pool[Math.floor(Math.random() * pool.length)];
    
    // Pick anomaly seat (avoid first and last seat - too easy/obvious)
    const maxIdx = Math.max(1, seats.length - 2);
    const anomalySeatIdx = 1 + Math.floor(Math.random() * maxIdx);
    
    // Build NPC spawn list
    const npcs = seats.map((seat, i) => ({
      position: { x: seat.x, y: seat.y, z: seat.z },
      side: seat.side,
      isAnomaly: i === anomalySeatIdx,
      anomalyType: i === anomalySeatIdx ? anomalyType : null,
    }));
    
    this.currentAnomaly = { type: anomalyType, seatIndex: anomalySeatIdx };
    
    return { npcs, anomalyType, anomalySeatIndex: anomalySeatIdx, npcCount };
  }
  
  getFlickerLevel() {
    if (this.loopNumber < 3) return 'low';
    if (this.loopNumber < 6) return 'medium';
    if (this.loopNumber < 9) return 'high';
    return 'extreme';
  }
  
  _getNPCCount(loop) {
    if (loop < 3) return 3;
    if (loop < 6) return 4;
    if (loop < 9) return 5;
    return 6;
  }
}
