import chalk from 'chalk'
import { KAMICHA, TOIMEN, SHIMOCHA } from './../constants'
import tileSymbol from './tileSymbol'

const renderDiscard = (print, player, discard) => {
  print(0, 0, player)
  discard.forEach((move, index) => {
    const symbol = tileSymbol(+move.tile / 4 | 0)
    print((index % 6) * 2, 1 + (index / 6 | 0), move.tsumogiri ? chalk.inverse(symbol) : symbol )
  })
}

export default (print, discards) => {
  renderDiscard((x, y, string) => print(x, y, string), SHIMOCHA, discards[SHIMOCHA])
  renderDiscard((x, y, string) => print(x + 14, y, string), TOIMEN, discards[TOIMEN])
  renderDiscard((x, y, string) => print(x + 28, y, string), KAMICHA, discards[KAMICHA])
}


export const viewSize = [ 40, 7 ]
