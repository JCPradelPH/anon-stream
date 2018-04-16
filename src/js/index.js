import {pipe,Observable} from 'rxjs/Rx'
import SimpleWebRtc from 'simplewebrtc'
import attachMediaStream from 'attachmediastream'
import uuid from 'uuid/v1'
import {dummy_users} from '../dummy_users.js'

SimpleWebRtc.prototype.attachStream = function (stream) {
  attachMediaStream(stream, this.getLocalVideoContainer(), this.config.localVideo)
}

SimpleWebRtc.prototype.stopLocalVideo = function (stream) {
  console.log(`overriden stopLocalVideo initialized`)
  console.log(stream)
  this.webrtc.stop()
  stream.getTracks().forEach( (track) => {
    console.log(`stream loop`)
    track.stop();
  })
}
export const BASE_URL = process.env.NODE_ENV=='development'?'/':'/'
export const userMediaSupported = () => { return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia) }
export const generateUniqid = () => uuid()
export const permittedDevices = () => navigator.mediaDevices.enumerateDevices()
export const initialState = () => ({
  initialState: {
    webrtc: {
      mediaAllowed: false,
      loading: true,
      error:null,
      stream:null,
      connected:false,
      localVideoEl:null,
      localstream:null,
      statusMessage:"",
      remoteVideosEl:null
    },
    firebaseIntegration: {
      signedIn: false,
      initialized: false,
      firebaseLoading: false,
      successcreate: false,
      successfetch: false,
      successrtfetch: false,
      successdelete: false,
      realTimeData: null,
      relatedData: null,
      user: null,
      token: null,
      error: null,
    },
    roomsettings: {
      roomId: null,
      password: null,
      defaultPassword: null,
      name: null,
      includePassword: false,
      isSaving: false,
      saved: false,
      flagState: false,
    },
    requiredFieldHandler: {
      disabled: true,
      isValid: true,
      value: null,
    },
  }
})
export const firebaseConfig = () => ({
    apiKey: "AIzaSyDlGL_KNedpxYgvZKM8vVR1zHv51ysScuU",
    authDomain: "sess-io.firebaseapp.com",
    databaseURL: "https://sess-io.firebaseio.com",
    projectId: "sess-io",
    storageBucket: "sess-io.appspot.com",
    messagingSenderId: "145103145697"
  })
export const generateDummyData = () => {
  const dummyRooms = dummy_users()
    .map( row => {
      const rid = uuid()
      return {
        [rid] : {
          name: row.displayName,
          password: uuid(),
          roomId: rid,
          user: {
            displayName: row.displayName,
            email: row.email,
            photoURL: row.photoURL
          }
        }
      }
    } )
  return dummyRooms
}
export const putFirebaseUserObs$ = (action) => (data) => {
  const {token,displayName,email,photoURL,path} = data
  const cuRequest = putUser$(action)(path)
  return Observable.create(
    cuRequest({displayName,photoURL,token})
      .subscribe({
        next: data => console.log(data),
        error: err => console.log(err),
      })
  )
}
const putUser$ = (action) => (path) => (obj) => {
  return Observable.create( obs => {
    action.putDataRequest(path,obj)
      .then( data => {
        obs.next(data)
        obs.complete()
      }  )
      .catch( err => obs.error(err) )
  } )
}
