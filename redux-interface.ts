interface State {
  [propName: string]: any
}

interface RudecerReturn {
  getState(): State
  dispatch(): void
  subscribe(listen: any): void
}

interface Action {
  type: string
  [propName: string]: any
}

interface StateChange {
  (state: object, action: Action): State
}

interface Reducer {
  (state: State, stateChange: () => State): RudecerReturn
}

interface ReducerLts {
  (state: State, action: Action): RudecerReturn
}

const reducer: Reducer = (state, stateChange) => {
  const listener = []
  const getState = () => state
  const subscribe = (listen) => listener.push(listen)
  const dispatch = () => {
    state = stateChange()
    listener.forEach((cb) => {
      cb(state)
    })
  }
  return { getState, dispatch, subscribe }
}

function createStore(stateChanger) {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = stateChanger(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({}) // 初始化 state
  return { getState, dispatch, subscribe }
}
