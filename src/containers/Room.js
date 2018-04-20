import React from 'react'
import ReactDOM from 'react-dom'
import {Redirect} from 'react-router-dom'
import SimpleWebRtc from 'simplewebrtc'
import uuid from 'uuid/v1'
import {Observable} from 'rxjs/Rx'
import { zip } from 'rxjs/observable/zip'
import { of } from 'rxjs/observable/of'

import {userMediaSupported,BASE_URL} from '../js'
import LocalDisplay from '../components/webrtc/LocalDisplay'
import ButtonTether from '../components/ButtonTether'
import SearchRoomPanel from './SearchRoomPanel'

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
    // roomSettings
    roomId: store.roomsettings.roomId,
  }
} )

export default class Room extends React.Component{
  componentWillMount(){ }

  componentDidMount(){
    const {action,signedIn,user} = this.props
    if(signedIn){
      zip( this.initWebrtc$(), this.mediaPermRq$(),
        this.getExistingRoom$('rooms','user.email','==',user.email),
        (isConnected,media,room) => ({isConnected,media,room})
      ).subscribe({
        next: data => {
          if(data.room==null)
            action.webrtc.attachStream(data.media.stream)
          else{
            console.log(`data.room[0].name: ${data.room[0].name}`)
            this.processExistingRoom$(data.room[0],data.media.stream)
              .subscribe( val => console.log(val) )
          }
        },
        error: err => console.log(err),
      })
    }
  }

  processExistingRoom$ = (data,stream) => {
    return zip(
      of(this.props.action.webrtc.attachStream(stream)),
      of(this.props.action.roomsettings.setRoomId(data.roomId)),
      of(this.props.action.roomsettings.setDefaultPassword(data.password)),
      of(this.props.action.roomsettings.setName(data.name)),
      of(this.props.action.roomsettings.setSaveState(true)),
      (wrtc,roomId,pass,name,saveState) => console.log(wrtc,roomId,pass,name,saveState)
    )
  }

  componentWillUnmount(){ this.props.action.webrtc.disconnect() }

  initWebrtc$ = () => {
    return Observable.create( obs => {
      this.props.action.webrtc.init()
      .then( connected => obs.next(connected) )
      .catch( err => obs.error(err) )
    } )
  }

  mediaPermRq$ = () => {
    return Observable.create( obs => {
      this.props.action.webrtc
      .checkMediaPerm(this.props.signedIn)
      .then( stream => obs.next(stream) )
      .catch( err => obs.error(err) )
    } )
  }

  getExistingRoom$ = (path,field,op,val) => {
    return Observable.create( obs => {
      this.props.action.firebaseIntegration
      .fetchRelatedData(path,field,op,val)
      .then( data => obs.next(data) )
      .catch( err => obs.error(err) )
    } )
  }

  render(){
    const {signedIn} = this.props
    return(
      !signedIn?<Redirect to={`${BASE_URL}`} /> :
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
          <SearchRoomPanel {...props} />
        </section>
        <section id="mid-panel">
          <div id={props.remoteVideosEl}></div>
        </section>
        <section id="right-panel">
          <LocalDisplay {...props} />
          {
            props.mediaAllowed?
              <ButtonTether {...props} roomId={props.roomId!=null?props.roomId:generateRoomId()}
                title={'Room Settings'} ComponentContent={CreateRoomForm} /> :
              <div></div>
          }
        </section>
      </section>
  )
}
const generateRoomId = () => uuid()
