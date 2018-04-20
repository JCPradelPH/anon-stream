import React from 'react'
import {pipe,Subject} from 'rxjs/Rx'
import {distinctUntilChanged,debounceTime} from 'rxjs/operators'

import {connect} from 'react-redux'

@connect( store => {
  return {
    includePassword: store.roomsettings.includePassword,
    firebaseLoading: store.firebaseIntegration.firebaseLoading,
    successcreate: store.firebaseIntegration.successcreate,
    flagState: store.roomsettings.flagState,
    saved: store.roomsettings.saved,
  }
} )
export default class RoomPasswordField extends React.Component{

  state = { passwordShown: false }

  updatePasswordFieldState = () => {
    const {includePassword,action} = this.props
     action.roomsettings.setIncludePassword(!includePassword)
  }

  componentDidMount(){
    this.obs$ = new Subject()
    this.passFieldSubs = this.obs$
      .pipe( debounceTime(500),distinctUntilChanged() )
      .subscribe( val => this.props.action.roomsettings.setPassword(val) )
  }

  handlePasswordChange = (e) => {
    this.obs$.next(e.target.value)
  }

  componentWillUnmount(){
    this.passFieldSubs.unsubscribe()
  }

  passwordInp = () => document.querySelector('#room-pass')

  handleCheckChange = (ev) => this.passwordInp().value=ev.target.checked?this.passwordInp().value:''

  render(){
    const {includePassword,firebaseLoading,saved,flagState,roomPassword} = this.props
    console.log(`roomPassword: ${roomPassword}`)
    return(
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            {
              saved?<i class="fa fa-key"></i>:
              <input type="checkbox" disabled={firebaseLoading} onChange={this.handleCheckChange}
                onClick={ this.updatePasswordFieldState.bind(this,!includePassword) } />
            }
          </div>
        </div>
        {
          flagState?
          <p disabled id="flag-spacer"></p>:
          roomPassword!=null?<div class="fake-field form-control">{this.state.passwordShown?roomPassword:'••••••••••••'}</div> :
          <input id="room-pass" onChange={this.handlePasswordChange} type={this.state.passwordShown?"text":"password"}
            readOnly={saved} class="form-control" disabled={firebaseLoading?true:!includePassword} placeholder="Room password" aria-label="Room password" />
        }
        <div class="input-group-append">
          <button class={this.state.passwordShown?"btn pressed":"btn btn-outline-secondary"}
            onClick={() => {this.setState({ passwordShown: !this.state.passwordShown })}} type="button"><i class="fa fa-eye"></i></button>
        </div>
        <small id="emailHelp" class="form-text text-muted">Only users that know your password can join your room.</small>
      </div>
    )
  }
}
