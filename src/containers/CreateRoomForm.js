import React from 'react'
import CreateRoomButton from '../components/create-room-form/CreateRoomButton'
import RoomIdField from '../components/create-room-form/RoomIdField'
import RoomPasswordField from '../components/create-room-form/RoomPasswordField'
import RequiredTextField from '../components/RequiredTextField'
import {connect} from 'react-redux'

@connect( store => {
  return {
    defaultPassword: store.roomsettings.defaultPassword,
    name: store.roomsettings.name
  }
} )
export default class CreateRoomForm extends React.Component{
  render(){
    const {defaultPassword,name} = this.props
    return(
      <form id="create-room-form">
        <RoomIdField {...this.props} />
        <RequiredTextField {...this.props}
          roomName={name}
          helpMsg="Your room name makes it easier to identify the room you created"
          errMsg="Kindly provide a room name"
          label="Enter Room Name"
          id="txtroomname" />
        <RoomPasswordField roomPassword={defaultPassword} {...this.props} />
        <CreateRoomButton {...this.props} />
      </form>
    )
  }
}
