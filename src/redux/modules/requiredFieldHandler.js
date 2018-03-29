import {createReducer, createConstants} from 'redux-module-builder'

const types = createConstants('REQ_FIELD_HANDLER')(
  'TOGGLE_DISABLED','VALIDATE_INPUT','SET_INPUT'
)

export const reducers = createReducer({
  [types.TOGGLE_DISABLED]: (state,action) => ({...state,disabled:action.enabled?false:true}),
  [types.VALIDATE_INPUT]: (state,action) => ({...state,isValid:action.isValid}),
  [types.SET_INPUT]: (state,action) => ({...state,value:action.value}),
})

export const actions = {
  toggleEnabled: (enabled) => (dispatch) => dispatch( {type:types.TOGGLE_DISABLED,enabled} ),
  toggleValidInput: (isValid) => (dispatch) => dispatch( {type:types.VALIDATE_INPUT,isValid} ),
  setValue: (value) => (dispatch) => dispatch( {type:types.SET_INPUT,value} ),
}
