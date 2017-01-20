import React from 'react'
import { observer } from 'mobx-react'
import Tile from './Tile'
import styled from 'styled-components'

const Field = styled.div`
`

const Row = styled.div`
  display: flex;
`

const Slot = styled.div`
  width: 40px;
  height: 50px;
  display: flex;
  flex-wrap: wrap;
  padding: 3px;
  align-items: center;
  justify-content: space-around;
`

const H1 = styled.h1`
  color: white;
  font-face: Helvetica;
`

const range = (limit) => new Array(limit).fill(0).map((_, i) => i)

const getLevel = (tiles, tile) => {
  let count = 0
  for (var i = tile; i < tile + 4; i++) {
    if (tiles.find(x => x === i)) {
      count++
    }
  }
  return count
}

const VisibleTiles = ({ store }) => (
  <div>
    <H1>Visible Tiles</H1>
    <Field>
      { range(4).map(suit => (
        <Row key={suit}>
        { range(suit == 3 ? 7 : 9).map(digit => {
          const type = digit + suit * 9;
          const level = getLevel(store.visibleTiles, type * 4)
          return (
            <Slot key={digit}>
              {
                range(level).map(instanceNumber => (
                  <Tile
                    key={instanceNumber}
                    width={16}
                    height={22}
                    tile={type * 4}
                  />
                ))
              }
            </Slot>
          )
          })
        }
      </Row>
      )) }
    </Field>
  </div>
)

export default observer(VisibleTiles)
