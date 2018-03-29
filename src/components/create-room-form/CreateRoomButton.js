import React from 'react'
import {Rx,Observable,pipe} from 'rxjs/Rx'
import {map} from 'rxjs/operators'

import {ButtonIconLastWhiteSm,ButtonIconLastRedSm} from '../'

import {connect} from 'react-redux'

@connect( store => {
  return {
    roomId: store.roomsettings.roomId,
    password: store.roomsettings.password,
    includePassword: store.roomsettings.includePassword,
    firebaseLoading: store.firebaseIntegration.firebaseLoading,
    successcreate: store.firebaseIntegration.successcreate,
    user: store.firebaseIntegration.user,
    roomName: store.requiredFieldHandler.value,
  }
} )
export default class CreateRoomButton extends React.Component{

  validateRequiredInput = () => {
    const {action, roomName} = this.props
    if(roomName==null||roomName==""){
      action.requiredFieldHandler.toggleValidInput(false)
    }else{
      action.requiredFieldHandler.toggleValidInput(true)
      this.saveRoomSettings()
    }
  }
  saveRoomSettings = () => {
    const {action,roomId,user,password,roomName} = this.props
    const putRoom = this.putRoom$(`rooms/${roomId}`)
    putRoom({name:roomName,password,userRef: user.email})
      .subscribe({
        next: data => console.log(data),
        error: err => console.log(err),
      })
  }
  leaveRoomSettings = () => {
    const {action,roomId,user,password} = this.props
    this.deleteRoom$(`rooms/${roomId}`)
      .subscribe({
        next: data => action.roomsettings.refreshState(),
        error: err => console.log(err),
      })
  }

  putRoom$ = (path) => (obj) => {
    return Observable.create( obs => {
      this.props.action.firebaseIntegration
        .putDataRequest(path,obj)
        .then( data => obs.next(data)  )
        .catch( err => obs.error(err) )
    } )
  }
  deleteRoom$ = (path) => {
    return Observable.create( obs => {
      this.props.action.firebaseIntegration
        .deleteDataRequest(path)
        .then( data => obs.next(data)  )
        .catch( err => obs.error(err) )
    } )
  }

  render(){
    const {firebaseLoading,successcreate} = this.props
    console.log(`firebaseLoading: ${firebaseLoading}`)
    return(
      successcreate?<ButtonIconLastRedSm onClick={this.leaveRoomSettings} disabled={firebaseLoading} buttonlabel={firebaseLoading?'Leaving...':'Leave Room'} />:
      <ButtonIconLastWhiteSm onClick={this.validateRequiredInput} disabled={firebaseLoading} buttonlabel={firebaseLoading?'Creating...':'Create'} />
    )
  }
}
