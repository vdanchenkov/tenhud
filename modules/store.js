import { observable, action, computed } from 'mobx'

class Store {
  @observable moves = []

  @action addMove(move) {
    if (move.type == 'start') {
      this.moves.clear()
    }
    this.moves.push(move)
  }

  @computed get visibleTiles() {
    const visible = []
    this.moves.forEach(move => {
      switch(move.type) {
        case 'start':
          visible.push(+move.dora)
          move.hand.forEach(tile => visible.push(+tile))
          break
        case 'discard':
          if (move.player > 0) {
            visible.push(move.tile)
          }
          break
        case 'dora':
          visible.push(move.tile)
          break
        case 'take':
          visible.push(move.tile)
          break
      }
    })
    return visible
  }

  @computed get discards() {
    const discards = [[], [], [], []]
    this.moves.forEach(move => {
      if (move.type === 'discard' && move.player > 0) {
        discards[move.player].push({ tsumogiri: move.tsumogiri, tile: move.tile })
      }
    })
    return discards
  }
}

const store = new Store()

export default store
