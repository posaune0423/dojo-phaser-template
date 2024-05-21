import './App.css'
import { useState } from 'react'

import { TextStyle } from 'pixi.js'
import { Container, Sprite, Text } from '@pixi/react'
import { useWindowSize } from './hooks/useWindowSize'
import { CustomStage } from './components/Stage'
import { Player } from './components/Player'

const playerUrl = 'https://pixijs.com/assets/bunny.png'
const obstacleUrl = 'https://pixijs.com/assets/eggHead.png'

export const App = () => {
  const [playerY, setPlayerY] = useState(300)
  const [obstacles, setObstacles] = useState([{ x: 500, y: 300 }])
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)

  const [width, height] = useWindowSize()

  const handleJump = () => {
    if (!gameOver) {
      setPlayerY(playerY - 50)
    }
  }

  return (
    <CustomStage>
      <Container interactive={true} pointerdown={handleJump}>
        <Player
          image={playerUrl}
          x={100}
          y={playerY}
          playerY={playerY}
          obstacles={obstacles}
          setObstacles={setObstacles}
          score={score}
          setScore={setScore}
          gameOver={gameOver}
          setGameOver={setGameOver}
        />
        {obstacles.map((obstacle, index) => (
          <Sprite
            key={index}
            image={obstacleUrl}
            x={obstacle.x}
            y={obstacle.y}
          />
        ))}
        {gameOver && (
          <Text
            text={`Game Over! Score: ${score}`}
            x={width / 2}
            y={height / 2}
            anchor={0.5}
            style={new TextStyle({ fill: '#ffffff', fontSize: 24 })}
          />
        )}
      </Container>
    </CustomStage>
  )
}
