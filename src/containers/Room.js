import React from 'react'
import ReactDOM from 'react-dom'
import SimpleWebRtc from 'simplewebrtc'
import {permittedDevices, userMediaSupported} from '../js'
export default class Room extends React.Component{
  componentDidMount(){
    console.log(this.props)
    this.roomId = this.props.match.params.roomId
    this.disconnect = this.disconnect.bind(this)
  }
  componentWillUnmount(){
    this.disconnect()
  }
  disconnect(){
    this.webrtc.leaveRoom()
    this.webrtc.stopLocalVideo()
    this.webrtc.disconnect()
  }
  render(){
    userMediaSupported(checkMediaPerm).then( hasPerm => {
      if(hasPerm)
        this.webrtc = new SimpleWebRtc({
            localVideoEl: 'local-vid-container',
            remoteVideoEl: "",
            autoRequestMedia: true
        })
      }
    )
    return(
      <section>
        <h1>Room</h1>
        <section id="local-vid-container"></section>
      </section>
    )
  }
}

const checkMediaPerm = () => {
  new Promise( (resolve,reject) => {
    navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {
      resolve(true)
    }, function(e){
      resolve(false)
    })
  } )
}
