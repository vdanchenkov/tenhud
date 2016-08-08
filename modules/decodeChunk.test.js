import {expect} from 'chai'
import decodeChunk from './decodeChunk'

describe('decodeChunk', () => {
  it('parses single command', () => {
    expect(decodeChunk('<Z/>')).to.eql([ { type: 'Z' } ])
  })

  it('parses series of commands', () => {
    expect(decodeChunk("<A/>\0<INIT/>")).to.eql([ { type: 'A' }, { type: 'INIT' } ])
  })

  it('parses command value', () => {
    expect(decodeChunk('<u564/>')).to.eql([ { type: 'u', value: '564' } ])
  })

  it('parses attributes', () => {
    expect(decodeChunk('<init123 hai="123,543"/>')).to.eql([ { type: 'init', value: '123', hai: "123,543" } ])
  })
})
