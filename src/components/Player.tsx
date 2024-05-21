import { Sprite, useTick } from '@pixi/react'

export const Player = ({
  image,
  x,
  y,
  playerY,
  obstacles,
  gameOver,
  setScore,
  setObstacles,
  setGameOver,
}: {
  image: string
  x: number
  y: number
  playerY: number
  obstacles: { x: number; y: number }[]
  setObstacles: React.Dispatch<React.SetStateAction<{ x: number; y: number }[]>>
  score: number
  setScore: React.Dispatch<React.SetStateAction<number>>
  gameOver: boolean
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  useTick((delta) => {
    if (!gameOver) {
      const newObstacles = obstacles
        .map((obstacle) => ({
          ...obstacle,
          x: obstacle.x - 5 * delta,
        }))
        .filter((obstacle) => obstacle.x > -100)

      if (
        newObstacles.some(
          (obstacle) =>
            Math.abs(obstacle.x - 100) < 50 &&
            Math.abs(obstacle.y - playerY) < 50
        )
      ) {
        setGameOver(true)
      }

      setObstacles(newObstacles)
      setScore((prev) => prev + delta)
    }
  })

  return <Sprite image={image} x={x} y={y} />
}
