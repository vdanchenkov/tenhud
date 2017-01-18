export default (command) => {
  const { type, value, hai } = command
  switch (type) {
    case 'INIT': {
      const hand = command.hai.split(',')
      const dora = command.seed.split(',').pop()
      return { type: 'start', hand, dora }
    }
    case 'DORA':
      return { type: 'dora', tile: +hai }
    case 'E':
      return { type: 'discard', tsumogiri: false, player: 1, tile: +value }
    case 'F':
      return { type: 'discard', tsumogiri: false, player: 2, tile: +value }
    case 'G':
      return { type: 'discard', tsumogiri: false, player: 3, tile: +value }
    case 'e':
      return { type: 'discard', tsumogiri: true, player: 1, tile: +value }
    case 'f':
      return { type: 'discard', tsumogiri: true, player: 2, tile: +value }
    case 'g':
      return { type: 'discard', tsumogiri: true, player: 3, tile: +value }
    case 'D':
      return value ? { type: 'discard', player: 0, tile: +value } : undefined
    case 'T':
      return { type: 'take', tile: +value }
  }
}
