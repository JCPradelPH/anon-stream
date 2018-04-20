import React from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'

export default class RoomIdField extends React.Component{
  constructor(props){
    super()
    this.state = {
      copied: false,
      toastShown: false,
      value: props.roomId
    }
    props.action.roomsettings.setRoomId(props.roomId)
  }
  onCopy = () => {
    this.setState({copied: true,toastShown:true})
    setTimeout( () => this.setState({toastShown:false}), 3000 )
  }
  render(){
    const {roomId} = this.props
    return(
      <div class="input-group mb-3">
        <input type="text" readOnly class="form-control" value={roomId} aria-describedby="basic-addon2" />
        <div class="input-group-append">
          <CopyToClipboard text={this.state.value} onCopy={this.onCopy}>
            <button class="btn btn-outline-secondary" type="button"><i class="fa fa-copy"></i></button>
          </CopyToClipboard>
        </div>
        <small id="emailHelp" class="form-text text-muted">Share your room id for others to easily find your room.</small>
        <div id="copy-toast" class={this.state.toastShown?"valid-tooltip t-shown":"valid-tooltip t-hidden"}> Room id has been copied to clipboard </div>
      </div>
    )
  }
}
