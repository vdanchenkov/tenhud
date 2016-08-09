import { reverse } from 'ramda'

export default (print, log) => {
  print(0, 0, 'Command log')
  log.slice(-20, -1).forEach((logItem, line) => {
      print(0, line, JSON.stringify(logItem))
  })
}
