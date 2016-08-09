import { sum, range, repeat, insert } from 'ramda'
import chalk from 'chalk'
import tileSymbol from './tileSymbol'

export default (print, tiles) => {
  const renderHiddenTile = (type) => {
    const count = 4 - sum([0, 1, 2, 3].map(i => tiles[type * 4 + i] ? 1 : 0))
    const suit = type / 9 | 0
    const number = type % 9

    const x = suit * 10
    const y = number
    print(x, y + 1, tileSymbol(type).repeat(count))
  }

  print(0, 0, 'Hidden tiles')
  range(0, 34).forEach(renderHiddenTile)
}
