import './App.css'
import { useMemo } from 'react'

import { BlurFilter, TextStyle } from 'pixi.js'
import { Stage, Container, Sprite, Text } from '@pixi/react'
import { useWindowSize } from './hooks/useWindowSize'

const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png'

export const App = () => {
  const blurFilter = useMemo(() => new BlurFilter(2), [])
  const [width, height] = useWindowSize()

  return (
    <Stage
      options={{
        background: 0x1099bb,
        antialias: true,
      }}
      width={width}
      height={height}
    >
      <Container x={width / 2} y={height / 2}>
        <Sprite image={bunnyUrl} x={-100} y={-50} />
        <Sprite image={bunnyUrl} x={100} y={-50} />
        <Sprite image={bunnyUrl} x={0} y={0} />

        <Text
          text="Hello World"
          anchor={0.5}
          x={20}
          y={100}
          filters={[blurFilter]}
          style={
            new TextStyle({
              align: 'center',
              fill: '0xffffff',
              fontSize: 50,
              letterSpacing: 20,
              dropShadow: true,
              dropShadowColor: '#E72264',
              dropShadowDistance: 6,
            })
          }
        />
      </Container>
    </Stage>
  )
}
