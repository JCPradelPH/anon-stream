import React from 'react'
import {pipe,Observable} from 'rxjs/Rx'
import {distinctUntilChanged,debounceTime,map} from 'rxjs/operators'

import {connect} from 'react-redux'

@connect( store => {
  return{
    disabled: store.requiredFieldHandler.disabled,
    isValid: store.requiredFieldHandler.isValid,
    firebaseLoading: store.firebaseIntegration.firebaseLoading,
    successcreate: store.firebaseIntegration.successcreate,
    flagState: store.roomsettings.flagState,
  }
} )
export default class RequiredTextField extends React.Component{
  componentDidMount(){
    const mapEv = map( ev => ev.target.value )
    const obs$ = Observable.fromEvent(this.inp(),'input')
      .pipe( mapEv,debounceTime(500),distinctUntilChanged() )
    this.fieldSubs = obs$.subscribe( val => this.props.action.requiredFieldHandler.setValue(val) )
  }
  componentWillUnmount(){
    this.fieldSubs.unsubscribe()
  }
  inp = () => document.querySelector(`#${this.props.id}`)
  render(){
    const {
      isValid,helpMsg,errMsg,flagState,
      label,disabled,successcreate,
      firebaseLoading,id="def-name"} = this.props
    return(
      <div class="form-group">
        {
        flagState?
        <p disabled id="flag-spacer"></p>:
        <input type="text" disabled={firebaseLoading?true:successcreate} class={isValid?"form-control":"form-control invalid-input"}
          aria-describedby="nameHelp" id={id} placeholder={label} />
          }
        <small id="nameHelp" class={isValid?"form-text text-muted":"form-text text-muted invalid-help-text"}>{isValid?helpMsg:errMsg}</small>
      </div>
    )
  }
}
