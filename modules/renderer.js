import ReactDOM from 'react-dom'
import React from 'react'
import { observable, action, computed } from 'mobx'
import { observer } from "mobx-react"
import listen from './listen'
import store from './store'
import VisibleTiles from './view/VisibleTiles'

listen(move => store.addMove(move))

const Log = observer(
  ({store}) =>
    <div>
      {store.moves.map((move, i) => <div key={i}>{JSON.stringify(move)}</div>)}
    </div>
)

ReactDOM.render(
  <div>
    <h1>Hello, world!</h1>
    {/* <Log store={store}/> */}
    <VisibleTiles store={store}/>
  </div>,
  document.getElementById('root')
)
