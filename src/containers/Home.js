import React from 'react'
import {NavLink} from 'react-router-dom'
export default class Home extends React.Component{

  render(){
    return(
      <div id="main-container">
        <HeaderLogo />
        <ButtonSection />
      </div>
    )
  }
}
const HeaderLogo = () => {
  return(
    <section id="logo-holder">
      <img id="main-logo" src="../css/images/main-logo-lt.png" />
      <p>Create video|voice calls on the fly</p>
    </section>
  )
}
const ButtonSection = () => {
  return(
    <section id="btn-holder">
      <CreateRoomButton />
      <p>or</p>
      <JoinRoomInput />
    </section>
  )
}

const CreateRoomButton = () => {
  return(
    <NavLink id="bt-create-room" class="btn btn-primary" activeClassName="active" exact to={'/'}>
      <i class="fa fa-plus-circle"></i>
      <p>Create A Room</p>
    </NavLink>
  )
}

const JoinRoomInput = () => {
  return(
    <div id="room-id-holder" class="input-group mb-3">
      <input type="text" id="room-id" name="room-id" class="room-id form-control" placeholder="Enter room id"
        aria-label="Enter room id" aria-describedby="basic-addon2" />
      <div class="input-group-append">
        <button class="btn btn-primary" type="button">Join<i class="fa fa-sign-in-alt"></i></button>
      </div>
    </div>
  )
}
