import { observable, action, computed } from 'mobx'

class Store {
  @observable moves = []

  @action addMove(move) {
    this.moves.push(move)
  }

  @computed get visibleTiles() {
    const visible = []
    this.moves.forEach(move => {
      if (move.type == 'discard') {
        visible.push(move.tile)
      }
    })
    console.log(visible.join('|'))
    return visible
  }
}

const store = new Store()

export default store
