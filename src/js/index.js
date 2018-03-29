import SimpleWebRtc from 'simplewebrtc'
import attachMediaStream from 'attachmediastream'

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
      user: null,
      token: null,
      error: null,
    },
    roomsettings: {
      roomId: null,
      password: null,
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
