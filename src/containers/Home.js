import React from 'react'
import {MainLogoLt} from '../components'
import SigninButtonSection from './SigninButtonSection'

export default class Home extends React.Component{
  componentWillMount(){ }
  componentDidMount(){ }
  componentWillUnmount(){ }
  render(){
    return(
      <div id="main-container">
        <HeaderLogo />
        <SigninButtonSection {...this.props} />
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
