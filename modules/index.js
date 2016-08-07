import http from 'http'
import pcap from 'pcap'
import chalk from 'chalk'
import { times, flatten } from 'ramda'
import translateCommand from './translateCommand'
import decodeChunk from './decodeChunk'

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

const render = ({discards, known}) => {
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

listen()
