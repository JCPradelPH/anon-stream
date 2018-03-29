import React from 'react'
import {LoaderAnimSm,FacebookButton,GoogleButton} from '../components'
import {Rx,pipe,Observable} from 'rxjs/Rx'
import {pluck,map} from 'rxjs/operators'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import uniqid from 'uniqid'

@connect( (store) => {
  return {
    signedIn: store.firebaseIntegration.signedIn,
    initialized: store.firebaseIntegration.initialized,
    firebaseLoading: store.firebaseIntegration.firebaseLoading,
    successcreate: store.firebaseIntegration.successcreate,
    successfetch: store.firebaseIntegration.successfetch,
  }
} )

export default class SigninButtonSection extends React.Component{

  componentWillMount(){
    const {action} = this.props
    action.firebaseIntegration.init()
  }
  componentDidMount(){
    this.props.action.firebaseIntegration.onAuthStateChanged()
  }
  componentWillUnmount(){}
  render(){
    const {successcreate,signedIn} = this.props
    return(
      successcreate||signedIn?
      <Redirect to={'/room'} /> : <ButtonSection {...this.props} />
    )
  }
}

const ButtonSection = (props) => {
  return(
    props.firebaseLoading?<section id="btn-holder"><LoaderAnimSm /></section>:
    <section id="btn-holder">
      <SigninBtn action={props.action} id={'bt-facebook-signin'}
        flag={process.env.FLAG_FACEBOOK_SIGNIN} iconclass={'fab fa-facebook-square'} buttonlabel={'Log in with'} />
      <SigninBtn action={props.action} id={'bt-google-signin'}
        flag={process.env.FLAG_GOOGLE_SIGNIN} iconclass={'fab fa-google-plus-square'} buttonlabel={'Sign in with'} />
    </section>
  )
}
const SigninBtn = (props) => {
  return(
    props.flag==process.env.FLAG_FACEBOOK_SIGNIN?
      <FacebookButton {...props} onClick={execSignin.bind(this,props)} /> :
      <GoogleButton {...props} onClick={execSignin.bind(this,props)} />
  )
}
const signInListener$ = (props) => {
  return Observable.create( obs => {
    props.action.firebaseIntegration
      .execSignInPopup(props.flag)
      .then( data => {
        obs.next(data)
        obs.complete()
      }  )
      .catch( err => obs.error(err) )
  } )
}
const putUser$ = (props) => (path) => (obj) => {
  return Observable.create( obs => {
    props.action.firebaseIntegration
      .putDataRequest(path,obj)
      .then( data => {
        obs.next(data)
        obs.complete()
      }  )
      .catch( err => obs.error(err) )
  } )
}
const execSignin = (props) => {
  const handler = handlePut$(props)
  const setPath = map( data => ({...data,path:`users/${data.email}`}) )
  signInListener$(props)
    .pipe(setPath)
    .subscribe({
      next: data => handler(data),
      error: err => console.log(err)
    })
}
const handlePut$ = (props) => (data) => {
  const {token,displayName,email,photoURL,path} = data
  const cuRequest = putUser$(props)(path)
  return Observable.create(
    cuRequest({displayName,photoURL,token})
      .subscribe({
        next: data => console.log(data),
        error: err => console.log(err),
      })
  )
}
