import React from 'react'
import styled, { css } from 'styled-components'

const getImg = (tile) => {
  const type = tile / 4 | 0
  const suit = type / 9 | 0
  const number = type % 9

  return suit === 0 ? `Man${number + 1}`:
        suit === 1 ? `Pin${number + 1}` :
        suit === 2 ? `Sou${number + 1}` :
        ['Ton', 'Nan', 'Shaa', 'Pei', 'Haku', 'Hatsu', 'Chun'][number]
}

const Tile = styled.div`
  width: ${props => props.width || 30}px;
  height: ${props => props.height || 40}px;
  background-position: center, center;
  background-image: url(tile-images/${props => getImg(props.tile)}.svg), url(tile-images/front.svg);
  background-repeat: no-repeat, no-repeat;
  background-size: ${props => (props.width || 30) - 2}px ${props => (props.height || 40) - 2}px,
                   cover;
`

export default Tile
