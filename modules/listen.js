import http from 'http'
import pcap from 'pcap'
import decodeChunk from './decodeChunk'

export default (store) => {
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
        decodeChunk(chunk).forEach(action => store.dispatch(action))
      }
      tcpSession.on("data send", handle);
      tcpSession.on("data recv", handle)
    }
  })
}
