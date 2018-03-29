import React from 'react'
import CreateRoomButton from '../components/create-room-form/CreateRoomButton'
import RoomIdField from '../components/create-room-form/RoomIdField'
import RoomPasswordField from '../components/create-room-form/RoomPasswordField'
import RequiredTextField from '../components/RequiredTextField'

export default class CreateRoomForm extends React.Component{
  render(){
    const {saved} = this.props
    return(
      <form id="create-room-form">
        <RoomIdField {...this.props} />
        <RequiredTextField {...this.props}
          helpMsg="Your room name makes it easier to identify the room you created"
          errMsg="Kindly provide a room name"
          label="Enter Room Name"
          id="txtroomname" />
        <RoomPasswordField {...this.props} />
        <CreateRoomButton {...this.props} />
      </form>
    )
  }
}
