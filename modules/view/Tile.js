import React from 'react'

const suitSymbols =  '東南西北白發中'
const digitSymbols = '１２３４５６７８９'

const Tile = ({tile}) => {
  const type = tile / 4 | 0
  const suit = type / 9 | 0
  const number = type % 9
  return suit === 0 ? <span style={{color: 'red'}}>{digitSymbols[number]}</span> :
    suit === 1 ? <span style={{color: 'blue'}}>{digitSymbols[number]}</span> :
    suit === 2 ? <span style={{color: 'green'}}>{digitSymbols[number]}</span> :
    <span>{suitSymbols[number]}</span>
}

export default Tile
