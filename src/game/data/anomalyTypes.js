export const ANOMALY_TYPES = [
  {
    id: 'head_turner',
    name: 'The Head Turner',
    difficulty: 'easy',
    description: 'Head rotates 180°+ to stare at player when not looking, snaps back when player faces them',
    // Parameters for the animation system
    headRotationSpeed: 2.0,       // radians per second toward player
    snapBackDuration: 0.1,        // seconds to snap head back
    triggerDistance: 4.0,          // meters - how close player must be
    dotProductThreshold: 0.3,     // player must be looking away (dot < this)
  },
  {
    id: 'rigid_one',
    name: 'The Rigid One',
    difficulty: 'easy',
    description: 'Zero idle animations, mannequin stillness',
    idleAnimationWeight: 0.0,
  },
  {
    id: 'twitcher',
    name: 'The Twitcher',
    difficulty: 'easy',
    description: 'Violent micro-jitters in neck/shoulders every 2-5s',
    twitchMinInterval: 2.0,
    twitchMaxInterval: 5.0,
    twitchDuration: 0.2,
    twitchIntensity: 15.0,
  },
  {
    id: 'starer',
    name: 'The Starer',
    difficulty: 'easy',
    description: 'Eyes always locked on player camera',
    eyeTrackingSpeed: 10.0,
  },
  {
    id: 'smiler',
    name: 'The Smiler',
    difficulty: 'medium',
    description: 'Mouth stretches grotesquely wide over 10 seconds',
    smileDuration: 10.0,
    smileMaxScale: 3.5,
  },
  {
    id: 'finger_count',
    name: 'The Extra Finger',
    difficulty: 'medium',
    description: 'Has 6 fingers on one hand',
    extraFingerScale: 1.0,
  },
  {
    id: 'position_shifter',
    name: 'The Shifter',
    difficulty: 'medium',
    description: 'Teleports to adjacent seat when player looks away',
    shiftCooldown: 5.0,
    dotProductThreshold: 0.2,
  },
  {
    id: 'shadow',
    name: 'The Shadowless',
    difficulty: 'hard',
    description: 'Casts no shadow (all others do)',
    castShadow: false,
  },
  {
    id: 'backwards_one',
    name: 'The Backwards One',
    difficulty: 'hard',
    description: 'Body faces backwards but head faces forward',
    bodyRotationY: Math.PI,
    headRotationY: 0,
  },
  {
    id: 'follower',
    name: 'The Follower',
    difficulty: 'hard',
    description: 'Stands up after 8s and walks toward player at 0.3m/s',
    standDelay: 8.0,
    walkSpeed: 0.3,
  }
];

export const DIFFICULTY_POOLS = {
  easy: ['head_turner', 'rigid_one', 'twitcher', 'starer'],
  medium: ['smiler', 'finger_count', 'position_shifter'],
  hard: ['shadow', 'backwards_one', 'follower'],
};

export function getAnomalyPoolForLoop(loopNumber) {
  let pool = [];
  if (loopNumber <= 2) {
    pool = [...DIFFICULTY_POOLS.easy];
  } else if (loopNumber <= 4) {
    pool = [...DIFFICULTY_POOLS.easy, ...DIFFICULTY_POOLS.medium];
  } else {
    pool = [...DIFFICULTY_POOLS.easy, ...DIFFICULTY_POOLS.medium, ...DIFFICULTY_POOLS.hard];
  }
  return pool;
}
