import { useTick } from '@pixi/react'
import { useWindowSize } from '../hooks/useWindowSize'
import { Platform } from './Platform'

export interface Platform {
  x: number
  y: number
  width: number
  height: number
}

const generateRandomPlatform = (lastX: number) => {
  const minWidth = 100
  const maxWidth = 300
  const minHeight = 100
  const maxHeight = 300
  const minGap = 50
  const maxGap = 200

  const width = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth
  const height =
    Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight
  const x = lastX + Math.floor(Math.random() * (maxGap - minGap + 1)) + minGap
  const y = Math.random() * (window.innerHeight - height) // Random height from the bottom

  return { x, y, width, height }
}

export const StageManager = ({
  isGameOver,
  platforms,
  setPlatforms,
}: {
  isGameOver: boolean
  platforms: Platform[]
  setPlatforms: React.Dispatch<React.SetStateAction<Platform[]>>
}) => {
  const [width] = useWindowSize()

  useTick(() => {
    if (isGameOver) return
    if (platforms.length === 0) {
      const newPlatform = generateRandomPlatform(0)
      setPlatforms((prevPlatforms) => [...prevPlatforms, newPlatform])
    } else {
      const lastPlatform = platforms[platforms.length - 1]
      if (lastPlatform.x < width) {
        const newPlatform = generateRandomPlatform(
          lastPlatform.x + lastPlatform.width
        )

        setPlatforms((prevPlatforms) => [...prevPlatforms, newPlatform])
      }
    }

    // Moving Platforms
    setPlatforms((prevPlatforms) =>
      prevPlatforms.map((platform) => ({
        ...platform,
        x: platform.x - 1,
      }))
    )
  })

  return (
    <>
      {platforms.map((platform, index) => (
        <Platform
          key={index}
          x={platform.x}
          y={platform.y}
          width={platform.width}
          height={platform.height}
        />
      ))}
    </>
  )
}
