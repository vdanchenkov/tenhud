import http from 'http'
import pcap from 'pcap'
import chalk from 'chalk'
import { times, flatten } from 'ramda'
import translateCommand from './translateCommand'
import decodeChunk from './decodeChunk'
import render from './renderTsumogiri'

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
        //  console.log('-> ' + chunk)
      });
      const discards = [[], [], []]
      tcpSession.on("data recv", (tcp_session, chunk) => {
        decodeChunk(chunk).map(translateCommand).forEach(action => {
          console.log(action)
          switch (action.type) {
            case 'discard':
              discards[action.player - 1].push({ tsumogiry: action.tsumogiry, tile: action.tile })
              break;
            case 'init':
              discards[0] = []
              discards[1] = []
              discards[2] = []
          }
        })
        // console.log(discards)
        render({discards})
      });
    }
  })
}

const discardCoord = (index) => {
  if (index < 6) {
      return [index, 0]
  } else if (index < 12) {
    return [index % 6, 1]
  } else {
    return [index - 12, 2]
  }
}

listen()
