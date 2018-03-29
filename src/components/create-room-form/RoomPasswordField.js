import React from 'react'
import {pipe,Observable} from 'rxjs/Rx'
import {distinctUntilChanged,debounceTime,map} from 'rxjs/operators'
import {CopyToClipboard} from 'react-copy-to-clipboard'

import {connect} from 'react-redux'

@connect( store => {
  return {
    includePassword: store.roomsettings.includePassword,
    firebaseLoading: store.firebaseIntegration.firebaseLoading,
    successcreate: store.firebaseIntegration.successcreate,
    flagState: store.roomsettings.flagState,
  }
} )
export default class RoomPasswordField extends React.Component{

  state = { passwordShown: false }

  updatePasswordFieldState = () => {
    const {includePassword,action} = this.props
     action.roomsettings.setIncludePassword(!includePassword)
  }

  componentDidMount(){
    const mapEv = map( ev => ev.target.value )
    const obs$ = Observable.fromEvent(this.passwordInp(),'input')
      .pipe( mapEv,debounceTime(500),distinctUntilChanged() )
    this.passFieldSubs = obs$.subscribe( val => this.props.action.roomsettings.setPassword(val) )
  }

  componentWillUnmount(){
    this.passFieldSubs.unsubscribe()
  }

  passwordInp = () => document.querySelector('#room-pass')

  handleCheckChange = (ev) => this.passwordInp().value=ev.target.checked?this.passwordInp().value:''

  render(){
    const {includePassword,firebaseLoading,successcreate,flagState} = this.props
    return(
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            {
              successcreate?<i class="fa fa-key"></i>:
              <input type="checkbox" disabled={firebaseLoading} onChange={this.handleCheckChange}
                onClick={ this.updatePasswordFieldState.bind(this,!includePassword) } />
            }
          </div>
        </div>
        {
          flagState?
          <p disabled id="flag-spacer"></p>:
          <input id="room-pass" type={this.state.passwordShown?"text":"password"}
            readOnly={successcreate} class="form-control" disabled={firebaseLoading?true:!includePassword} placeholder="Room password" aria-label="Room password" />
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
