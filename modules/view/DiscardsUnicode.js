import chalk from 'chalk'
import { KAMICHA, TOIMEN, SHIMOCHA } from './../constants'

const suitSymbols =  '東南西北白發中'
const digitSymbols = '１２３４５６７８９'

const tileSymbol = (tile) => {
  const kind = tile / 4 | 0
  const suit = kind / 9 | 0
  const number = kind % 9

  return suit === 0 ? chalk.red(digitSymbols[number]) :
    suit === 1 ? chalk.blue(digitSymbols[number]) :
    suit === 2 ? chalk.green(digitSymbols[number]):
    suitSymbols[number]
}

const renderDiscard = (print, player, discard) => {
  print(0, 0, player)
  discard.forEach((move, index) => {
    const symbol = tileSymbol(move.tile)
    print((index % 6) * 2, 1 + (index / 6 | 0), move.tsumogiri ? chalk.inverse(symbol) : symbol )
  })
}

export default (print, discards) => {
  renderDiscard((x, y, string) => print(x, y, string), SHIMOCHA, discards[SHIMOCHA])
  renderDiscard((x, y, string) => print(x + 14, y, string), TOIMEN, discards[TOIMEN])
  renderDiscard((x, y, string) => print(x + 28, y, string), KAMICHA, discards[KAMICHA])
}


export const viewSize = [ 40, 7 ]
