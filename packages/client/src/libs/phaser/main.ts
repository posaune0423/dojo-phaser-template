import Phaser from "phaser";

import Game from "./scenes/Game";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 200 },
    },
  },
  scene: [Game],
};

export default new Phaser.Game(config);
