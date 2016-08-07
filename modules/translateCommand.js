const actions = {
  'E': (c) => ({ type: 'discard', tsumogiry: false, player: 1, tile: +c.value }),
  'F': (c) => ({ type: 'discard', tsumogiry: false, player: 2, tile: +c.value }),
  'G': (c) => ({ type: 'discard', tsumogiry: false, player: 3, tile: +c.value }),
  'e': (c) => ({ type: 'discard', tsumogiry: true, player: 1, tile: +c.value }),
  'f': (c) => ({ type: 'discard', tsumogiry: true, player: 2, tile: +c.value }),
  'g': (c) => ({ type: 'discard', tsumogiry: true, player: 3, tile: +c.value }),
  'INIT': (c) => ({ type: 'init' }),
  default: (c) => c
 }

export default (command) => (actions[command.type] || actions.default)(command)
