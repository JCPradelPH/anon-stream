import {createConstants, createReducer} from 'redux-module-builder'
import {createApiAction,createApiHandler} from 'redux-module-builder/api'
import * as firebase from 'firebase'

import {firebaseConfig} from '../../js'

const types = createConstants('FIREBASE_SIGNIN')(
  'INIT','GOOGLE_LOGIN'
)

export const reducers = createReducer({
  [types.INIT]: (state,action) => ({...state,initialized:action.initialized,error:action.error}),
  [types.GOOGLE_LOGIN]: (state,action) => ({...state,signedIn:action.initialized,user:action.user,token:action.token})
})

export const actions = {
  init: () => (dispatch) => {
    try{
      firebase.initializeApp(firebaseConfig())
      firebase.auth().useDeviceLanguage()
      dispatch({type: types.INIT,initialized:true,error:null})
      return true
    }catch(e){
      dispatch({type: types.INIT,initialized:false,error:e})
      return false
    }
  },
  execGoogleSignInPopup: () => (dispatch) => {
    return new Promise( (resolve,reject) => {
      firebase.auth().signInWithPopup(firebaseProvider()).then(function(result) {
        const token = result.credential.accessToken
        const user = result.user
        dispatch({type:types.GOOGLE_LOGIN,signedIn:true,user,token})
        resolve({token,user})
      }).catch(function(error) {
        dispatch({type:types.GOOGLE_LOGIN,signedIn:false})
        reject(error)
      })
    } )
  }
}

const firebaseProvider = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  provider.addScope(process.env.GOOGLE_SCOPE_URL)
  return provider
}
