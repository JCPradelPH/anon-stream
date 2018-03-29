import {createReducer,createConstants} from 'redux-module-builder'

const types = createConstants('ROOM_SETTINGS')(
  'SET_ROOM_ID','SET_PASSWORD','INCLUDE_PASSWORD','SAVE_ROOM',
  'RESET_STATE'
)

export const reducers = createReducer({
  [types.SET_ROOM_ID]: (state,action) => ({...state,roomId:action.roomId}),
  [types.SET_PASSWORD]: (state,action) => ({...state,password:action.password}),
  [types.INCLUDE_PASSWORD]: (state,action) => ({...state,includePassword:action.includePassword}),
  [types.SAVE_ROOM]: (state,action) => ({...state,isSaving:action.isSaving,saved:action.saved,left:false,includePassword:false}),
  [types.RESET_STATE]: (state,action) => ({...state,flagState:action.flagState}),
})

export const actions = {
  setRoomId: (roomId) => (dispatch) => {
    dispatch({type:types.SET_ROOM_ID,roomId})
  },
  setPassword: (password) => (dispatch) => {
    dispatch({type:types.SET_PASSWORD,password})
  },
  setIncludePassword: (includePassword) => (dispatch) => {
    dispatch({type:types.INCLUDE_PASSWORD,includePassword})
  },
  refreshState: () => (dispatch) => {
    dispatch({type:types.RESET_STATE,flagState:true})
    setTimeout( () => dispatch({type:types.RESET_STATE,flagState:false}), 1 )
  },
}
