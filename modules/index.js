#!/usr/bin/env node

import chalk from 'chalk'
import { createStore } from 'redux'
import reducer from './reducer'
import { terminal } from 'terminal-kit'
import listen from './listen'
import DiscardsUnicode from './view/DiscardsUnicode'
import KnownTiles from './view/KnownTiles'
import HiddenTiles from './view/HiddenTiles'
import HiddenTilesMap from './view/HiddenTilesMap'
import CommandLog from './view/CommandLog'

const store = createStore(reducer)

const printAt = (baseX, baseY) => (x, y, string) => terminal.moveTo(x + 1 + baseX, y + 1 + baseY, string)

store.subscribe(() => {
  terminal.clear()
  DiscardsUnicode(printAt(0, 0), store.getState().discards)
  // KnownTiles(printAt(0, 5), store.getState().deadTiles)
  // HiddenTiles(printAt(28, 5), store.getState().deadTiles)
  HiddenTilesMap(printAt(0, 5), store.getState().deadTiles)
  //CommandLog(printAt(0, 15), store.getState().log)
})

listen(store)
