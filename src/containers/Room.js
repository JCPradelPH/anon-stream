import React from 'react'
import ReactDOM from 'react-dom'
import {Redirect} from 'react-router-dom'
import SimpleWebRtc from 'simplewebrtc'
import uuid from 'uuid/v1'
import Rx from 'rxjs/Rx'

import {userMediaSupported} from '../js'
import LocalDisplay from '../components/webrtc/LocalDisplay'
import ButtonTether from '../components/ButtonTether'
import RoomList from './RoomList'
import CreateRoomForm from './CreateRoomForm'

import {connect} from 'react-redux'

@connect( (store) => {
  return {
    // webrtc states
    remoteVideosEl: store.webrtc.remoteVideosEl,
    localstream: store.webrtc.localstream,
    webrtcLoading: store.webrtc.loading,
    error: store.webrtc.error,
    mediaAllowed: store.webrtc.mediaAllowed,
    // firebase states
    signedIn: store.firebaseIntegration.signedIn,
    user: store.firebaseIntegration.user,
    firebaseLoading: store.firebaseIntegration.loading,
  }
} )

export default class Room extends React.Component{
  componentWillMount(){ }

  componentDidMount(){
    const {action,signedIn} = this.props
    if(signedIn){
      Rx.Observable.zip( this.initWebrtc$(), this.mediaPermRq$(),
        (isConnected,media) => ({isConnected,media})
      ).subscribe({
        next: data => action.webrtc.attachStream(data.media.stream),
        error: err => console.log(err),
      })
    }
  }

  componentWillUnmount(){ this.props.action.webrtc.disconnect() }

  initWebrtc$ = () => {
    return Rx.Observable.create( obs => {
      this.props.action.webrtc.init()
      .then( connected => obs.next(connected) )
      .catch( err => obs.error(err) )
    } )
  }

  mediaPermRq$ = () => {
    return Rx.Observable.create( obs => {
      this.props.action.webrtc
      .checkMediaPerm(this.props.signedIn)
      .then( stream => obs.next(stream) )
      .catch( err => obs.error(err) )
    } )
  }

  render(){
    const {signedIn} = this.props
    console.log(`Room render`)
    return(
      !signedIn?<Redirect to={'/'} /> :
      <section id="room-container">
        <ValMediaSupportedComp userMediaSupported={userMediaSupported()} {...this.props} />
      </section>
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
      <section id="rm-content">
        <section id="left-panel">
          <LocalDisplay {...props} />
          {
            props.mediaAllowed?
              <LeftBottomPanel {...props} /> :
              <div></div>
          }
        </section>
        <section id="right-panel">
          <div id={props.remoteVideosEl}></div>
        </section>
      </section>
  )
}
const LeftBottomPanel = (props) => {
  return (
    <div id="bot-panel" class={props.mediaAllowed?'button-holder':'hidden button-holder'}>
      <ButtonTether {...props} roomId={generateRoomId()} title={'Room Settings'} ComponentContent={CreateRoomForm} />
      <RoomList {...props} />
    </div>
  )
}
const generateRoomId = () => uuid()
