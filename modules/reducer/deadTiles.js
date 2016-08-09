import {
  TSUMOGIRI_KAMICHA,
  TSUMOGIRI_TOIMEN,
  TSUMOGIRI_SHIMOCHA,
  TEDASHI_KAMICHA,
  TEDASHI_TOIMEN,
  TEDASHI_SHIMOCHA,
  PLAYER_TAKE,
  PLAYER_DISCARD,
  DORA,
  INIT
} from './../actions'

import { KAMICHA, SHIMOCHA, TOIMEN } from './../constants'

import Immutable from 'seamless-immutable'

const reduce = (state, player, tile, tsumogiri) => state.set(player, state[player].concat({ tsumogiri, tile }))

export default (state = Immutable({}), action) => {
  switch (action.type) {
  case TSUMOGIRI_KAMICHA:
  case TSUMOGIRI_TOIMEN:
  case TSUMOGIRI_SHIMOCHA:
  case TEDASHI_KAMICHA:
  case TEDASHI_TOIMEN:
  case TEDASHI_SHIMOCHA:
  case PLAYER_TAKE:
    return state.set(action.value, true)
  case DORA:
    return state.set(action.hai, true)
  case INIT:
    const initState = {}
    action.hai.split(',').forEach(tile => initState[tile] = true)
    initState[action.seed.split(',').pop()] = true
    return Immutable(initState)
  default:
    return state
  }
}
