import React from 'react'
import {Observable} from 'rxjs/Rx'
import { zip } from 'rxjs/observable/zip'
import { of } from 'rxjs/observable/of'
import {ButtonIconLastWhiteSm,ButtonIconLastRedSm} from '../'

import {connect} from 'react-redux'

@connect( store => {
  return {
    roomId: store.roomsettings.roomId,
    saved: store.roomsettings.saved,
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
    console.log(`roomName: ${roomName}`)
    if(roomName==null||roomName==""){
      action.requiredFieldHandler.toggleValidInput(false)
    }else{
      action.requiredFieldHandler.toggleValidInput(true)
      this.saveRoomSettings()
    }
  }
  saveRoomSettings = () => {
    const {action,roomId,user,password,roomName} = this.props
    const putRoom = this.putData$(`rooms/${roomId}`)
    const putUser = this.putData$(`users/${user.email}`)
    zip( putRoom({name:roomName,password,roomId,user}),
      putUser({...user,room: {roomId,roomName,password} }),
      of(action.roomsettings.setPassword(password)),
      of(action.roomsettings.setName(roomName)),
      of(action.roomsettings.setSaveState(true)),
      data => ({data})
    ).subscribe({
      next: data => console.log(data),
      error: err => console.log(err),
    })
  }
  leaveRoomSettings = () => {
    const {action,roomId,user,password} = this.props
    const putUser = this.putData$(`users/${user.email}`)
    zip(
      this.deleteRoom$(`rooms/${roomId}`),
      putUser({...user}),
      of(action.requiredFieldHandler.setValue(null)),
      of(action.roomsettings.setDefaultPassword(null)),
      of(action.roomsettings.setPassword(null)),
      of(action.roomsettings.setName(null)),
      data => ({data})
    ).subscribe({
        next: data => action.roomsettings.refreshState(),
        error: err => console.log(err),
      })
  }

  putData$ = (path) => (obj) => {
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

  componentWillUnmount(){

  }

  render(){
    const {firebaseLoading,saved} = this.props
    return(
      saved?<ButtonIconLastRedSm onClick={this.leaveRoomSettings} disabled={firebaseLoading} buttonlabel={firebaseLoading?'Leaving...':'Leave Room'} />:
      <ButtonIconLastWhiteSm onClick={this.validateRequiredInput} disabled={firebaseLoading} buttonlabel={firebaseLoading?'Creating...':'Create'} />
    )
  }
}
