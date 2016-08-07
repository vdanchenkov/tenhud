import http from 'http'
import pcap from 'pcap'
import chalk from 'chalk'
import { times, flatten } from 'ramda'
import translateCommand from './translateCommand'
import decodeChunk from './decodeChunk'
import render from './renderTsumogiri'
import { createStore, combineReducers } from 'redux'
import { reducer as discardReducer } from './discard'

const store = createStore(combineReducers({ discardReducer }))

const displayTile = (tile) => {
  const kind = tile / 4 | 0
  const suit = kind / 9 | 0
  const number = kind % 9

  return suit === 0 ? chalk.red('１２３４５６７８９'[number]) :
    suit === 1 ? '１２３４５６７８９'[number] :
    suit === 2 ? chalk.green('１２３４５６７８９'[number]):
    '東西南北中發白'[number]
}

const listen = () => {
  const session = pcap.createSession('', 'ip proto \\tcp')
  const tracker = new pcap.TCPTracker()
  console.log("Listening on " + session.device_name)

  session.on('packet', (raw_packet) => {
    tracker.track_packet(pcap.decode.packet(raw_packet))
  })

  tracker.on('session', (tcpSession) => {
    if(tcpSession.dst.includes(':10080')) {
      console.log('Session is started');
      tcpSession.on("data send", (tcp_session, chunk) => {
        decodeChunk(chunk).forEach(action => store.dispatch(action))
      });
      tcpSession.on("data recv", (tcp_session, chunk) => {
        decodeChunk(chunk).forEach(action => store.dispatch(action))
      })
    }
  })
}
store.subscribe(() => console.log(store.getState()))
listen()
