import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import {MainLogoLt} from '../components'
import {generateUniqid} from '../js'
import Rx from 'rxjs/Rx'

import {connect} from 'react-redux'

@connect( (store) => {
  return {
    signedIn: store.firebaseSignin.signedIn,
    initialized: store.firebaseSignin.initialized,
    user: store.firebaseSignin.user,
    token: store.firebaseSignin.token,
    error: store.firebaseSignin.error,
  }
} )
export default class Home extends React.Component{
  componentWillMount(){
    this.props.action.firebaseSignin.init()
  }
  componentDidMount(){

  }
  componentWillUnmount(){

  }
  render(){
    const {initialized} = this.props
    console.log(`initialized: ${initialized}`)
    return(
      <div id="main-container">
        <HeaderLogo />
        <ButtonSection {...this.props} />
      </div>
    )
  }
}

const HeaderLogo = () => {
  return(
    <section id="logo-holder">
      <MainLogoLt />
    <p>Lorem ipsum damet ipsum </p>
    </section>
  )
}
const ButtonSection = (props) => {
  return(
    <section id="btn-holder">
      <FacebookSignin {...props} />
      <GoogleSignin {...props} />
    </section>
  )
}
const signInListener$ = (props) => {
  return Rx.Observable.create( obs => {
    props.action.firebaseSignin
      .execGoogleSignInPopup()
      .then( data => obs.next(data)  )
      .catch( err => obs.error(err) )
  } )
}
const GoogleSignin = (props) => {
  const execSignin = () => {
    console.log(`props: ${props}`)
    if(props.initialized){
      signInListener$.subscribe({
        next: data => console.log(data),
        error: err => console.log(err),
        complete: () => console.log('complete')
      })
    }
  }
  return(
    <button id="bt-google-signin" onClick={execSignin} class="btn btn-primary">
      <p>Sign in with</p>
      <i class="fab fa-google-plus-square"></i>
    </button>
  )
}
const FacebookSignin = () => {
  return(
    <button id="bt-facebook-signin" class="btn btn-primary">
      <p>Log in with</p>
      <i class="fab fa-facebook-square"></i>
    </button>
  )
}
