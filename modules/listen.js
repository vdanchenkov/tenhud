import http from 'http'
import pcap from 'pcap'
import decodeChunk from './decodeChunk'
import translateCommand from './translateCommand'

export default (dispatch) => {
  const session = pcap.createSession('', 'ip proto \\tcp')
  const tracker = new pcap.TCPTracker()
  console.log("Listening on " + session.device_name)

  session.on('packet', (raw_packet) => {
    tracker.track_packet(pcap.decode.packet(raw_packet))
  })

  tracker.on('session', (tcpSession) => {
    if(tcpSession.dst.includes(':10080')) {
      console.log('Session is started');
      const handle = (tcp_session, chunk) => {
        const result = []
        decodeChunk(chunk).map(translateCommand).filter(item => item !== undefined).forEach(dispatch)
      }
      tcpSession.on("data send", handle);
      tcpSession.on("data recv", handle)
    }
  })
}
