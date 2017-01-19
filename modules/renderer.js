import ReactDOM from 'react-dom'
import React from 'react'
import { observable, action, computed } from 'mobx'
import { observer } from "mobx-react"
import listen from './listen'
import store from './store'
import VisibleTiles from './view/VisibleTiles'
import Discards from './view/Discards'

listen(move => store.addMove(move))

const Log = observer(
  ({store}) =>
    <div>
      {store.moves.map((move, i) => <div key={i}>{JSON.stringify(move)}</div>)}
    </div>
)

ReactDOM.render(
  <div>
    <Discards store={store}/>
    <VisibleTiles store={store}/>
  </div>,
  document.getElementById('root')
)

process.on('uncaughtException', (err) => {
  console.error(err)
})
