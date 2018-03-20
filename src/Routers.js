import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './containers/Home'
import Room from './containers/Room'
import {configureStore} from './redux/configureStore'
import {initialState} from './js'

const {store, action} = configureStore(initialState())
export default class Routers extends React.Component{
  render(){
    return(
      <Switch>
        <Route exact path={'/'} render={ props => (
          <Home {...props} store={store} action={action} />
        ) } />
        <Route exact path={'/room'} render={ props => (
          <Room {...props} store={store} action={action} />
        ) } />
      </Switch>
    )
  }
}
