import chalk from 'chalk'
import { createStore } from 'redux'
import reducer from './reducer'
import { terminal } from 'terminal-kit'
import listen from './listen'
import DiscardsUnicode from './view/DiscardsUnicode'

const store = createStore(reducer)

const print = (x, y, string) => terminal.moveTo(x + 1, y + 1, string)

store.subscribe(() => {
  terminal.clear()
  DiscardsUnicode(print, store.getState().discards)
})

listen(store)
