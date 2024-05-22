import { TilingSprite, useTick } from '@pixi/react'
import { useState } from 'react'
import { useWindowSize } from '../hooks/useWindowSize'

export const Background = ({
  imageUrl,
  initialSpeed,
  isGameOver,
}: {
  imageUrl: string
  initialSpeed: number
  isGameOver: boolean
}) => {
  const [x, setX] = useState(0)
  const [width, height] = useWindowSize()

  useTick(() => {
    if (isGameOver) return
    setX((prev) => prev - initialSpeed)
  })

  return (
    <TilingSprite
      width={width}
      height={height}
      image={imageUrl}
      tilePosition={{ x, y: 0 }}
    />
  )
}
