import { createStore, combineReducers } from 'redux'
import log from './log'
import discards from './discards'
import deadTiles from './deadTiles'

export default combineReducers({ discards, deadTiles, log })
