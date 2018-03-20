import uuid from 'uuid/v1'
import SimpleWebRtc from 'simplewebrtc'
import attachMediaStream from 'attachmediastream'

SimpleWebRtc.prototype.attachStream = function (stream) {
  attachMediaStream(stream, this.getLocalVideoContainer(), this.config.localVideo)
}

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
    firebaseSignin: {
      signedIn: false,
      initialized: false,
      user: null,
      token: null,
      error: null,
    }
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
