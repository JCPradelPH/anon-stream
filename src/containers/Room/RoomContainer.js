import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

@connect( store => {
  return {
    // firebase states
    signedIn: store.firebaseIntegration.signedIn
  }
} )
export default class RoomContainer extends React.Component{

  componentDidMount(){

  }
  render(){
    return(
      !this.props.signedIn?<Redirect to={`${BASE_URL}`} /> :
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
        This browser does not support access to your Camera and Microphone
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
