import {createConstants, createReducer} from 'redux-module-builder'
import SimpleWebRtc from 'simplewebrtc'

const types = createConstants('WEBRTC')(
  'INIT', 'DISCONNECT', 'LOCAL_STREAM_ATTACHED',
  'MEDIA_PERM_ALLOWED':{api:true}
)
let webrtc
let localStream
export const reducers = createReducer({
  [types.MEDIA_PERM_ALLOWED]: (state,action) => ({
    ...state,
    loading:false,
    error:action.error,
    mediaAllowed: action.mediaAllowed,
    stream: action.stream,
    statusMessage:action.statusMessage
  }),
  [types.INIT]: (state,action) => ({
    ...state,
    connected:action.connected,
    localVideoEl:action.localVideoEl,
    remoteVideosEl:action.remoteVideosEl,
    statusMessage:'WebRTC Initialized'
  }),
  [types.DISCONNECT]: (state,action) => ({...state}),
  [types.LOCAL_STREAM_ATTACHED]: (state,action) => ({...state}),
})

export const actions = {
  init: () => (dispatch) => {
    return new Promise( (resolve,reject) => {
      const localVideoEl = 'local-vid'
      const remoteVideosEl = 'remote-vid-holder'
      webrtc = new SimpleWebRtc({
          localVideoEl,
          remoteVideosEl,
          autoRequestMedia: false
      })
      dispatch({ type: types.INIT, connected:true, localVideoEl, remoteVideosEl })
      resolve(true)
    } )
  },
  checkMediaPerm: (signedIn) => (dispatch) => {
    return new Promise( (resolve,reject) => {
      if(signedIn){
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
          .then( stream => {
            dispatch({ type: types.MEDIA_PERM_ALLOWED, mediaAllowed:true, stream: stream, statusMessage:'Media permission granted' })
            resolve({stream,mediaAllowed:true})
          } )
          .catch( err => {
            dispatch({ type: types.MEDIA_PERM_ALLOWED, error:err.message, mediaAllowed:false, stream: null, statusMessage:'Media permission denied'  })
             reject(err)
          } )
      }else{
        dispatch({ type: types.MEDIA_PERM_ALLOWED, error:'User not verified', mediaAllowed:false, stream: null, statusMessage:'User not verified'  })
        reject('User not verified')
      }
    } )
  },
  disconnect: () => (dispatch) => {
    try{
      webrtc.leaveRoom()
      webrtc.stopLocalVideo(localStream)
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
      localStream=stream
      webrtc.attachStream(localStream)
      dispatch({ type: types.LOCAL_STREAM_ATTACHED   })
      return true
    }catch(e){
      dispatch({ type: types.LOCAL_STREAM_ATTACHED   })
      return false
    }
  }
}
