import { createStore, combineReducers } from 'redux'
import discards from './discards'
import deadTiles from './deadTiles'

export default combineReducers({ discards, deadTiles })
