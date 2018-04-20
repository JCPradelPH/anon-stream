import React from 'react'

import PropTypes from 'prop-types'
import {LoaderAnimSm,FacebookButton,GoogleButton} from './widgets'

const ButtonSection = ({ isLoading,onFBClick,onGoogleClick,firebaseActions }) => {
  return(
    isLoading?<section id="btn-holder"><LoaderAnimSm /></section>:
    <section id="btn-holder">
      <FacebookButton id={'bt-facebook-signin'} onClick={onFBClick.bind(this,firebaseActions)}
        iconclass={'fab fa-facebook-square'} buttonlabel={'Log in with'} />
      <GoogleButton id={'bt-google-signin'} onClick={onGoogleClick.bind(this,firebaseActions)}
        iconclass={'fab fa-google-plus-square'} buttonlabel={'Sign in with'} />
    </section>
  )
}

ButtonSection.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onFBClick: PropTypes.func.isRequired,
  onGoogleClick: PropTypes.func.isRequired,
  firebaseActions: PropTypes.object,
}

export default ButtonSection
