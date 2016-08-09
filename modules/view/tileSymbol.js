import chalk from 'chalk'

const suitSymbols =  '東南西北白發中'
const digitSymbols = '１２３４５６７８９'

export default (type) => {
  const suit = type / 9 | 0
  const number = type % 9

  return suit === 0 ? chalk.red(digitSymbols[number]) :
    suit === 1 ? chalk.blue(digitSymbols[number]) :
    suit === 2 ? chalk.green(digitSymbols[number]):
    suitSymbols[number]
}
