import React from 'react'
import styled from 'styled-components'

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
  display: inline-block;
  width: 30px;
  height: 40px;
  background-position: center, center;
  background-image: url(tile-images/${props => getImg(props.tile)}.svg), url(tile-images/front.svg);
  background-repeat: no-repeat, no-repeat;
  background-size: 27px 37px, 29px 39px;
`

export default Tile
