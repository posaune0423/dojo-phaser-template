import { Sprite, useTick } from '@pixi/react'

export const Hero = ({
  x,
  y,
  textureUrl,
  jumpPower,
  gravity,
  jumping,
  onCollision,
  onJump,
}: {
  x: number
  y: number
  textureUrl: string
  jumpPower: number
  gravity: (delta: number) => void
  jumping: (delta: number) => void
  onCollision: () => void
  onJump: () => void
}) => {
  useTick(() => {
    if (y < 600) {
      gravity(1)
    }

    if (jumpPower > 0) {
      jumping(2)
      jumpPower -= 1
    }

    onCollision()
  })

  return (
    <Sprite image={textureUrl} x={x} y={y} interactive pointerdown={onJump} />
  )
}
