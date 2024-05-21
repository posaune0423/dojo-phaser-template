import { PropsWithChildren } from 'react'
import { Stage } from '@pixi/react'
import { useWindowSize } from '../hooks/useWindowSize'

export const CustomStage = ({ children, ...props }: PropsWithChildren) => {
  const [width, height] = useWindowSize()

  return (
    <Stage
      options={{
        background: 0x1099bb,
        antialias: true,
      }}
      width={width}
      height={height}
      {...props}
    >
      {children}
    </Stage>
  )
}
