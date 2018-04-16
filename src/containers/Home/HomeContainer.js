import React from 'react'
import {Redirect} from 'react-router-dom'
import {MainLogoLt} from '../../components'
import {putFirebaseUserObs$,BASE_URL} from '../../js'
import ButtonSectionContainer from './containers/ButtonSectionContainer'
import {connect} from 'react-redux'

@connect( store => {
  return {
    successcreate: store.firebaseIntegration.successcreate
  }
} )
export default class HomeContainer extends React.Component{
  componentDidMount(){
    const {action} = this.props
    const firebaseActions = action.firebaseIntegration
    firebaseActions.init()
    firebaseActions.onAuthStateChanged( (data) => {
      if(data!=null) putFirebaseUserObs$(firebaseActions)(data)
    } )
  }
  render(){
    return(
      <div id="main-container">
        <HeaderLogo />
        { this.props.successcreate?
            <Redirect to={`${BASE_URL}room`} /> :
          <ButtonSectionContainer {...this.props} /> }
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
