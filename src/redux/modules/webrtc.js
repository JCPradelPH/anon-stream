import {createConstants, createReducer} from 'redux-module-builder'
import {createApiAction, createApiHandler} from 'redux-module-builder/api'
import SimpleWebRtc from 'simplewebrtc'

const types = createConstants('WEBRTC')(
  'INIT', 'DISCONNECT', 'LOCAL_STREAM_ATTACHED',
  'MEDIA_PERM_ALLOWED':{api:true}
)
let webrtc
export const reducers = createReducer({
  [types.MEDIA_PERM_ALLOWED]: (state,action) => ({
    ...state,
    loading:false,
    error:action.error,
    mediaAllowed: action.isAllowed,
    stream: action.stream,
    statusMessage:action.statusMessage
  }),
  // ...createApiHandler( types.MEDIA_PERM_ALLOWED, apiStates => ({
  //   [apiStates.LOADING]: (state,action) => ( {...state,loading:true,statusMessage:'Requesting media permission...'} ),
  //   [apiStates.ERROR]: (state,action) => ( {...state,loading:false,error:action.payload.error,statusMessage:'There was an error requesting permission...'} )
  // }) )( (state,action) => ( {
  //   ...state,
  //   loading:false,
  //   error:action.payload.error,
  //   mediaAllowed: action.payload.isAllowed,
  //   stream: action.payload.stream,
  //   statusMessage:action.payload.statusMessage
  // } ) ),
  [types.INIT]: (state,action) => ({
    ...state,
    connected:action.connected,
    localVideoEl:action.localVideoEl,
    remoteVideosEl:action.remoteVideosEl,
    statusMessage:'WebRTC Initialized'
  }),
  [types.DISCONNECT]: (state,action) => ({...state,connected:action.connected,statusMessage:'WebRTC disconnected'}),
  [types.LOCAL_STREAM_ATTACHED]: (state,action) => ({...state}),
})

export const actions = {
  checkMediaPerm: () => (dispatch) => {
    return new Promise( (resolve,reject) => {
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
          .then( stream => {
            dispatch({ type: types.MEDIA_PERM_ALLOWED, isAllowed:true, stream: stream, statusMessage:'Media permission granted' })
            resolve(stream)
          } )
          .catch( err => {
            dispatch({ type: types.MEDIA_PERM_ALLOWED, error:err.message, isAllowed:false, stream: null, statusMessage:'Media permission denied'  })
             reject(err)
          } )
      } )
  },
  // checkMediaPerm: createApiAction( types.MEDIA_PERM_ALLOWED )( (client,opts) => {
  //   console.log(`checkMediaPerm action dispatched`)
  //   return new Promise( (resolve,reject) => {
  //     navigator.mediaDevices.getUserMedia({video: true, audio: true})
  //       .then( stream => ({ isAllowed:true, stream: stream, statusMessage:'Media permission granted' }) )
  //       .catch( err => ({ error:err.message, isAllowed:false, stream: null, statusMessage:'Media permission denied'  }) )
  //   } )
  // } ),
  init: () => (dispatch) => {
    return new Promise( (resolve,reject) => {
      webrtc = new SimpleWebRtc({
          localVideoEl: 'local-vid',
          remoteVideosEl: 'remote-vid-holder',
          autoRequestMedia: false
      })
      dispatch({ type: types.INIT, connected:true, localVideoEl, remoteVideosEl })
      console.log('init exe')
      resolve(true)
    } )
  },
  disconnect: () => (dispatch) => {
    try{
      webrtc.leaveRoom()
      webrtc.stopLocalVideo()
      webrtc.disconnect()
      dispatch({ type: types.DISCONNECT, connected:false, error:null })
      return true
    }catch(e){
      dispatch({ type: types.DISCONNECT, connected:true, error:e })
      return false
    }
  },
  attachStream: (stream) => (dispatch) => {
    try{
      webrtc.attachStream(stream)
      dispatch({ type: types.LOCAL_STREAM_ATTACHED   })
      return true
    }catch(e){
      dispatch({ type: types.LOCAL_STREAM_ATTACHED   })
      return false
    }
  }
}
