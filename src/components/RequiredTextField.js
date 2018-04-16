import React from 'react'
import {pipe, Subject} from 'rxjs/Rx'
import {distinctUntilChanged,debounceTime} from 'rxjs/operators'

import {connect} from 'react-redux'

@connect( store => {
  return{
    disabled: store.requiredFieldHandler.disabled,
    isValid: store.requiredFieldHandler.isValid,
    firebaseLoading: store.firebaseIntegration.firebaseLoading,
    flagState: store.roomsettings.flagState,
    saved: store.roomsettings.saved,
  }
} )
export default class RequiredTextField extends React.Component{
  componentDidMount(){
    this.obs$ = new Subject()
    this.fieldSubs = this.obs$
      .pipe( debounceTime(500),distinctUntilChanged() )
      .subscribe( val => {
        console.log(val)
        this.props.action.requiredFieldHandler.setValue(val)
      } )
  }
  componentWillUnmount(){
    this.fieldSubs.unsubscribe()
  }
  handleFieldChange = (e) => {
    this.obs$.next(e.target.value)
  }
  inp = () => document.querySelector(`#${this.props.id}`)
  render(){
    console.log(`RequiredTextField render`)
    const {
      isValid,helpMsg,errMsg,flagState,
      label,disabled,saved,
      firebaseLoading,id="def-name",roomName} = this.props
    return(
      <div class="form-group">
        {
        flagState?
          <p disabled id="flag-spacer"></p>:
            roomName!=null? <div class="fake-field form-control">{roomName}</div> :
              <input type="text" disabled={firebaseLoading?true:saved} onChange={this.handleFieldChange} class={isValid?"form-control":"form-control invalid-input"}
                aria-describedby="nameHelp" id={id} placeholder={label} />
        }
        <small id="nameHelp" class={isValid?"form-text text-muted":"form-text text-muted invalid-help-text"}>{isValid?helpMsg:errMsg}</small>
      </div>
    )
  }
}
