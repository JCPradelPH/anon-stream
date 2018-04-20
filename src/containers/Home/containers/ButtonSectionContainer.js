import {pipe,Observable} from 'rxjs/Rx'
import {map} from 'rxjs/operators'
import { connect } from 'react-redux'
import ButtonSection from './components/ButtonSection'
import {putFirebaseUserObs$} from '../../../js'

const mapStateToProps = (state,ownProps) => {
  const fbClick = execSignin(process.env.FLAG_FACEBOOK_SIGNIN)
  const googClick = execSignin(process.env.FLAG_GOOGLE_SIGNIN)
  return {
    isLoading: state.firebaseIntegration.firebaseLoading,
    onFBClick: fbClick,
    onGoogleClick: googClick,
    firebaseActions: ownProps.action.firebaseIntegration
  }
}

const execSignin = (flag) => (firebaseActions) => {
  const handler = putFirebaseUserObs$(firebaseActions)
  const setPath = map( data => ({...data,path:`users/${data.email}`}) )
  signInListener$(firebaseActions,flag)
    .pipe(setPath)
    .subscribe({
      next: data => handler(data),
      error: err => console.log(err)
    })
}
const signInListener$ = (firebaseActions,flag) => {
  return Observable.create( obs => {
    firebaseActions.execSignInPopup(flag)
      .then( data => {
        obs.next(data)
        obs.complete()
      }  )
      .catch( err => obs.error(err) )
  } )
}

export default connect(mapStateToProps)(ButtonSection)
