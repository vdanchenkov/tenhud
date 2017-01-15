import React from 'react'
import { observer } from 'mobx-react'
import Tile from './Tile'

const VisibleTiles = ({ store }) => (
  <div>
    <h1>Visible Tiles</h1>
    {store.visibleTiles && store.visibleTiles.map((tile) =>
      <Tile tile={tile}/>
    )}
  </div>
)

export default observer(VisibleTiles)
