import {
  TSUMOGIRI_KAMICHA,
  TSUMOGIRI_TOIMEN,
  TSUMOGIRI_SHIMOCHA,
  TEDASHI_KAMICHA,
  TEDASHI_TOIMEN,
  TEDASHI_SHIMOCHA,
  INIT
} from './../actions'

import { KAMICHA, SHIMOCHA, TOIMEN } from './../constants'

import Immutable from 'seamless-immutable'

const reduce = (state, player, tile, tsumogiri) => state.set(player, state[player].concat({ tsumogiri, tile }))

export default (state = Immutable({ PLAYER: [], KAMICHA: [], SHIMOCHA: [], TOIMEN: [] }), action) => {
  switch (action.type) {
  case TSUMOGIRI_KAMICHA:
    return reduce(state, KAMICHA, action.value, true)
  case TSUMOGIRI_TOIMEN:
      return reduce(state, TOIMEN, action.value, true)
  case TSUMOGIRI_SHIMOCHA:
      return reduce(state, SHIMOCHA, action.value, true)
  case TEDASHI_KAMICHA:
    return reduce(state, KAMICHA, action.value, false)
  case TEDASHI_TOIMEN:
      return reduce(state, TOIMEN, action.value, false)
  case TEDASHI_SHIMOCHA:
      return reduce(state, SHIMOCHA, action.value, false)
  case INIT:
    return Immutable({ PLAYER: [], KAMICHA: [], SHIMOCHA: [], TOIMEN: [] })
  default:
    return state
  }
}
