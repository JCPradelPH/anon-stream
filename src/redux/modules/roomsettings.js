import {createReducer,createConstants} from 'redux-module-builder'

const types = createConstants('ROOM_SETTINGS')(
  'SET_ROOM_ID','SET_PASSWORD','INCLUDE_PASSWORD','SAVE_ROOM',
  'RESET_STATE','SET_NAME','SET_DEF_PASSWORD'
)

export const reducers = createReducer({
  [types.SET_ROOM_ID]: (state,action) => ({...state,roomId:action.roomId}),
  [types.SET_PASSWORD]: (state,action) => ({...state,password:action.password}),
  [types.SET_DEF_PASSWORD]: (state,action) => ({...state,defaultPassword:action.defaultPassword}),
  [types.SET_NAME]: (state,action) => ({...state,name:action.name}),
  [types.INCLUDE_PASSWORD]: (state,action) => ({...state,includePassword:action.includePassword}),
  [types.SAVE_ROOM]: (state,action) => ({...state,saved:action.saved}),
  [types.RESET_STATE]: (state,action) => ({...state,flagState:action.flagState,saved:false,includePassword:false}),
})

export const actions = {
  setRoomId: (roomId) => (dispatch) => {
    dispatch({type:types.SET_ROOM_ID,roomId})
  },
  setPassword: (password) => (dispatch) => {
    dispatch({type:types.SET_PASSWORD,password})
  },
  setDefaultPassword: (defaultPassword) => (dispatch) => {
    dispatch({type:types.SET_DEF_PASSWORD,defaultPassword})
  },
  setName: (name) => (dispatch) => {
    dispatch({type:types.SET_NAME,name})
  },
  setIncludePassword: (includePassword) => (dispatch) => {
    dispatch({type:types.INCLUDE_PASSWORD,includePassword})
  },
  setSaveState: (saved) => (dispatch) => {
    dispatch({type:types.SAVE_ROOM,saved})
  },
  refreshState: () => (dispatch) => {
    dispatch({type:types.RESET_STATE,flagState:true})
    setTimeout( () => dispatch({type:types.RESET_STATE,flagState:false}), 1 )
  },
}
