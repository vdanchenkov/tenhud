import { sum, range, repeat, insert } from 'ramda'
import chalk from 'chalk'

const suitSymbols =  '東南西北白發中'
const digitSymbols = '１２３４５６７８９'

export default (print, tiles, labels = true) => {
  const countDead = (tileKind) => {
    return ' ⠉⠛⠿⣿'[sum([0, 1, 2, 3].map(i => tiles[tileKind * 4 + i] ? 1 : 0))]
  }
  const block = (base, count) => {
    return range(base, base + count).map(countDead).join('')
  }

  print(6, 0, 'Known tiles')
  print(6, 1, chalk.inverse('123 456 789'))

  print(0, 2, chalk.red('MAN:  ' + block(0, 3) + ' ' + block(3, 3) + ' ' + block(6, 3)))
  print(0, 3, chalk.blue('PIN:  ' + block(9, 3) + ' ' + block(12, 3) + ' ' + block(15, 3)))
  print(0, 4, chalk.green('SOU:  ' + block(18, 3) + ' ' + block(21, 3) + ' ' + block(24, 3)))
  print(6, 6, chalk.inverse('ESWN') + ' ' + chalk.bgWhite(' ') + chalk.bgGreen(' ') + chalk.bgRed(' '))
  print(0, 7, 'SUITS:' + block(27, 4) + ' ' + block(31, 3))

}
