import { useLayoutEffect, useRef } from "react";
import PhaserGame from "@/libs/phaser/main";

export const PhaserRenderer = () => {
  const gameRef = useRef<Phaser.Game>(null);

  useLayoutEffect(() => {
    if (gameRef.current === null) {
      gameRef.current = PhaserGame;
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        if (gameRef.current !== null) {
          gameRef.current = null;
        }
      }
    };
  }, []);

  return <div id="game-container"></div>;
};
