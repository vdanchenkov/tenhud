import Immutable from 'seamless-immutable'

export default (state = Immutable([]), action) => {
  return state.concat(action)
}
