/**
 * LoopManager.js
 * 
 * Game state machine and loop progression manager.
 * Handles transitions between subway cars, death sequences,
 * and game state (playing, dead, paused, transitioning).
 */

export const GAME_STATES = {
  START: 'START',
  ENTERING: 'ENTERING',
  PLAYING: 'PLAYING',
  TRANSITIONING: 'TRANSITIONING',
  DEATH_ANIMATION: 'DEATH_ANIMATION',
  DEAD: 'DEAD',
  PAUSED: 'PAUSED',
};

export default class LoopManager {
  constructor() {
    this.state = GAME_STATES.START;
    this.loopNumber = 0;
    this.isTransitioning = false;

    // Callbacks — set by the main game component
    this.onStateChange = null;        // (newState, data) => void
    this.onBuildNewCar = null;         // (loopNumber) => void
    this.onDeathSequence = null;       // () => void — triggers lighting/audio death effects
    this.onLoopComplete = null;        // (loopNumber) => void
  }

  getState() {
    return this.state;
  }

  getLoopNumber() {
    return this.loopNumber;
  }

  /**
   * Called when the game starts from the start screen
   */
  startGame() {
    this.loopNumber = 0;
    this._setState(GAME_STATES.ENTERING);
    
    // Build the first car
    if (this.onBuildNewCar) {
      this.onBuildNewCar(this.loopNumber);
    }

    // Brief delay then switch to playing
    setTimeout(() => {
      this._setState(GAME_STATES.PLAYING);
    }, 600);
  }

  /**
   * Called when the player correctly shoots the anomaly
   */
  anomalyKilled() {
    if (this.state !== GAME_STATES.PLAYING) return;
    
    this._setState(GAME_STATES.TRANSITIONING);
    this.isTransitioning = true;

    // Transition sequence: fade out, rebuild, fade in
    setTimeout(() => {
      this.loopNumber++;
      
      if (this.onLoopComplete) {
        this.onLoopComplete(this.loopNumber);
      }

      if (this.onBuildNewCar) {
        this.onBuildNewCar(this.loopNumber);
      }

      setTimeout(() => {
        this.isTransitioning = false;
        this._setState(GAME_STATES.PLAYING);
      }, 600);
    }, 800);
  }

  /**
   * Called when the player shoots a normal human
   */
  wrongTarget() {
    if (this.state !== GAME_STATES.PLAYING) return;
    this._triggerDeath();
  }

  /**
   * Called when the player walks past the anomaly without shooting it
   */
  missedAnomaly() {
    if (this.state !== GAME_STATES.PLAYING) return;
    this._triggerDeath();
  }

  /**
   * Called when the player shoots but hits nothing — they're now out of ammo
   * They can still observe and exit, but if anomaly is present they'll die
   */
  missedShot() {
    // Don't change state — player continues with no ammo
    // Death will trigger when they try to exit the car
  }

  /**
   * Called when player reaches the exit of the car (x > 5.5)
   * Returns true if the exit was clean (no anomaly), false if anomaly attacks
   */
  attemptExit(anomalyWasShot) {
    if (this.state !== GAME_STATES.PLAYING) return false;

    if (anomalyWasShot) {
      // This shouldn't normally be called — anomalyKilled() handles progression
      // But just in case, treat it as a successful transition
      this.anomalyKilled();
      return true;
    } else {
      // Player tried to exit without dealing with the anomaly
      this.missedAnomaly();
      return false;
    }
  }

  /**
   * Pause/unpause the game
   */
  pause() {
    if (this.state === GAME_STATES.PLAYING) {
      this._previousState = this.state;
      this._setState(GAME_STATES.PAUSED);
    }
  }

  unpause() {
    if (this.state === GAME_STATES.PAUSED) {
      this._setState(this._previousState || GAME_STATES.PLAYING);
    }
  }

  /**
   * Restart from loop 0
   */
  restart() {
    this.loopNumber = 0;
    this.isTransitioning = false;
    this._setState(GAME_STATES.ENTERING);

    if (this.onBuildNewCar) {
      this.onBuildNewCar(this.loopNumber);
    }

    setTimeout(() => {
      this._setState(GAME_STATES.PLAYING);
    }, 600);
  }

  /**
   * Quit to start screen
   */
  quitToMenu() {
    this.loopNumber = 0;
    this.isTransitioning = false;
    this._setState(GAME_STATES.START);
  }

  /**
   * Internal: trigger the death sequence
   */
  _triggerDeath() {
    this._setState(GAME_STATES.DEATH_ANIMATION);

    // Trigger death effects (lighting strobe, audio growl, camera shake)
    if (this.onDeathSequence) {
      this.onDeathSequence();
    }

    // After death animation completes, show death screen
    setTimeout(() => {
      this._setState(GAME_STATES.DEAD);
    }, 1500);
  }

  /**
   * Internal: set state and fire callback
   */
  _setState(newState) {
    const oldState = this.state;
    this.state = newState;
    if (this.onStateChange) {
      this.onStateChange(newState, { oldState, loopNumber: this.loopNumber });
    }
  }
}
