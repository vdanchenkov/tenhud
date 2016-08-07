export default ({discards, known}) => {
  const screen = times(() => times(() => ' ', 30), 12)

  // discards
  discards[0].forEach(({ tsumogiry }, index) => {
    const [x, y] = discardCoord(index)
    screen[8 - x][9 + y] = tsumogiry ? chalk.bgBlue(' ') : chalk.bgWhite(' ')
  })
  discards[1].forEach(({ tsumogiry }, index) => {
    const [x, y] = discardCoord(index)
    screen[2 - y][8 - x] = tsumogiry ? chalk.bgBlue(' ') : chalk.bgWhite(' ')
  })
  discards[2].forEach(({ tsumogiry }, index) => {
    const [x, y] = discardCoord(index)
    screen[3 + x][2 - y] = tsumogiry ? chalk.bgBlue(' ') : chalk.bgWhite(' ')
  })
  for(let ax = 3; ax < 9; ax++) {
    for(let ay = 3; ay < 9; ay++) {
      screen[ay][ax] = (ax + ay) % 2 ? chalk.blue('░') : ' '
    }
  }

  console.log("\x1B[2J")
  console.log(screen.map(line => flatten(line.map(x => x + x)).join('')).join('\n'))
}
