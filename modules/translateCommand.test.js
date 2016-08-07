import { expect } from 'chai'
import translateCommand from './translateCommand'

describe('translateCommand', () => {
  it('translates discards', () => {
    expect(translateCommand({ type: 'E', value: '25' })).to.eql({ type: 'discard', tsumogiry: false, player: 1, tile: 25 })
    expect(translateCommand({ type: 'F', value: '25' })).to.eql({ type: 'discard', tsumogiry: false, player: 2, tile: 25 })
    expect(translateCommand({ type: 'G', value: '25' })).to.eql({ type: 'discard', tsumogiry: false, player: 3, tile: 25 })
    expect(translateCommand({ type: 'e', value: '25' })).to.eql({ type: 'discard', tsumogiry: true, player: 1, tile: 25 })
    expect(translateCommand({ type: 'f', value: '25' })).to.eql({ type: 'discard', tsumogiry: true, player: 2, tile: 25 })
    expect(translateCommand({ type: 'g', value: '25' })).to.eql({ type: 'discard', tsumogiry: true, player: 3, tile: 25 })
  })
})
