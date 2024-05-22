import { Sprite, useTick } from '@pixi/react'

export const Hero = ({
  x,
  y,
  textureUrl,
  onCollision,
  onJump,
}: {
  x: number
  y: number
  textureUrl: string
  onCollision: () => void
  onJump: () => void
}) => {
  useTick(() => {
    onCollision()
  })

  return (
    <Sprite image={textureUrl} x={x} y={y} interactive pointerdown={onJump} />
  )
}
