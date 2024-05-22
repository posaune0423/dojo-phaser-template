import { useState } from 'react'
import '@pixi/events'
import { Hero } from './Hero'
import { Stage, Text } from '@pixi/react'
import { useWindowSize } from '../hooks/useWindowSize'
import { Background } from './Background'
import { Platform, StageManager } from './StageManager'
import { TextStyle } from 'pixi.js'

export const Game = () => {
  const [gameOver, setGameOver] = useState(false)
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [width, height] = useWindowSize()
  const [heroX] = useState(100)
  const [heroY, setHeroY] = useState(600)

  const handleCollision = () => {
    platforms.forEach((platform) => {
      if (
        heroX < platform.x + platform.width &&
        heroX + 50 > platform.x && // Assuming the hero's width is 50
        heroY < platform.y + platform.height &&
        heroY + 50 > platform.y // Assuming the hero's height is 50
      ) {
        setGameOver(true)
      }
    })
  }

  const handleJump = () => {
    setHeroY((prev) => prev - 100)
  }

  return (
    <Stage
      options={{
        background: 0x1099bb,
        antialias: true,
      }}
      width={width}
      height={height}
    >
      <Background
        imageUrl="/sprites/bg.png"
        initialSpeed={1}
        isGameOver={gameOver}
      />

      {!gameOver && (
        <Hero
          x={heroX}
          y={heroY}
          textureUrl="https://pixijs.io/pixi-react/img/bunny.png"
          onCollision={() => handleCollision()}
          onJump={() => handleJump()}
        />
      )}
      {gameOver && (
        <Text
          text={`Game Over!`}
          x={width / 2}
          y={height / 2}
          anchor={0.5}
          zIndex={10}
          style={
            new TextStyle({ fill: 'red', fontSize: 50, fontWeight: 'bold' })
          }
        />
      )}

      <StageManager
        platforms={platforms}
        setPlatforms={setPlatforms}
        isGameOver={gameOver}
      />
    </Stage>
  )
}
