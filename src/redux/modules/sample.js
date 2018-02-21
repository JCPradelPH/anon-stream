import {createConstants, createReducer} from 'redux-module-builder'
import {createApiAction, createApiHandler} from 'redux-module-builder/api'

const types = createConstants('SAMPLE')(
  'ADD',
  'FETCH': {api: true}
)

export const reducers = createReducer({
  [types.ADD]: (state, action) => ({ ...state, success:true }),
  ...createApiHandler( types.FETCH, (apiStates) => ({
    [types.LOADING]: (state,action) => ({...state, loading: true, error: null}),
    [types.ERROR]: (state, action) => ({...state, loading: false, error: action.payload})
  }) )( (state, action) => ({ ...state, loading:false, error: null, data: action.payload }) )
})

export const actions = {
  add: (item) => { console.log(`item: ${item}`) },
  fetch: createApiAction(types.FETCH)( (client,opts) => client.get('/fetch') )
}
