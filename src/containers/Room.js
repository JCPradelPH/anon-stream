import React from 'react'
import ReactDOM from 'react-dom'
import {Redirect} from 'react-router-dom'
import SimpleWebRtc from 'simplewebrtc'
import {userMediaSupported} from '../js'
import Rx from 'rxjs/Rx'

import LocalDisplay from '../components/LocalDisplay'

import {connect} from 'react-redux'

@connect( (store) => {
  return {
    connected: store.webrtc.connected,
    remoteVideosEl: store.webrtc.remoteVideosEl,
    localstream: store.webrtc.localstream,
    mediaAllowed: store.webrtc.mediaAllowed,
    loading: store.webrtc.loading,
    error: store.webrtc.error,
    stream: store.webrtc.stream,
    statusMessage: store.webrtc.statusMessage,
    localVideoEl: store.webrtc.localVideoEl
  }
} )

export default class Room extends React.Component{
  componentWillMount(){
    const {stream,action,roomId,localstream,connected} = this.props
    this.roomId = roomId
    const obs = {
      next: stream => action.webrtc.attachStream(stream),
      error: err => console.log(err),
      complete: () => console.log('mediaPerm completed')
    }
    this.initWebrtc$()
      .subscribe({
        next: connected => { if(connected) this.mediaPermRq$().subscribe(obs) },
        error: err => console.log(err)
      })
  }

  componentDidMount(){

  }

  componentWillUnmount(){
    console.log(`componentWillUnmount`)
    this.props.action.webrtc.disconnect()
  }

  mediaPermRq$ = () => {
    return Rx.Observable.create( obs => {
      this.props.action.webrtc.checkMediaPerm()
      .then( stream => obs.next(stream) )
      .catch( err => obs.error(err) )
    } )
  }
  initWebrtc$ = () => {
    return Rx.Observable.create( obs => {
      this.props.action.webrtc.init()
      .then( connected => obs.next(connected) )
      .catch( err => obs.error(err) )
    } )
  }

  render(){
    console.log(JSON.stringify(this.props,null,2))
    // console.log(`this.roomId: ${this.roomId}`)
    return(
      this.roomId!=undefined&&this.roomId!=""&&this.roomId!=null?
      <section id="room-container">
        <ValMediaSupportedComp userMediaSupported={userMediaSupported()} {...this.props} />
      </section> : <Redirect to="/"/>
    )
  }
}

const ValMediaSupportedComp = (props) => {
  return(
    props.userMediaSupported?
      <ValWrtcComp {...props} /> : <h4 class="jumbotron lg-msg">
        <i class="fa fa-video"></i>&nbsp;&nbsp;
        Your browser does not support access to your Camera and Microphone
      </h4>
  )
}

const ValWrtcComp = (props) => {
  return(
    props.connected?
      <section id="rm-content">
        <section id="left-panel">
          <LocalDisplay {...props} />
          <LeftBottomPanel {...props} />
        </section>
        <section id="right-panel">
          <div id={props.remoteVideosEl}></div>
        </section>
      </section> : <h4 class="jumbotron lg-msg">
        <i class="fa fa-video"></i>&nbsp;&nbsp;Your browser does not support WebRTC
      </h4>
  )
}

const LeftBottomPanel = (props) => {
  return (
    <div id="bot-panel" class={props.mediaAllowed?'button-holder':'hidden button-holder'}>
      <button class="btn btn-primary bt-default" type="button">
        Create Room<i class="fa fa-sign-in-alt"></i></button>
    </div>
  )
}
