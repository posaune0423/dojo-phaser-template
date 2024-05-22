import { Sprite } from '@pixi/react'

export const Platform = ({
  x,
  y,
  width,
  height,
}: {
  x: number
  y: number
  width: number
  height: number
}) => {
  return (
    <Sprite
      image="/sprites/platform.png"
      x={x}
      y={y}
      width={width}
      height={height}
    />
  )
}
