import React from 'react'
import {Switch, Route} from 'react-router-dom'
import HomeContainer from './containers/home/HomeContainer'
import Room from './containers/Room'
import {configureStore} from './redux/configureStore'
import {initialState,BASE_URL} from './js'

const {store, action} = configureStore(initialState())
export default class Routers extends React.Component{
  render(){
    return(
      <Switch>
        <Route exact path={`${BASE_URL}`} render={ props => (
          <HomeContainer {...props} store={store} action={action} />
        ) } />
        <Route exact path={`${BASE_URL}room`} render={ props => (
          <Room {...props} store={store} action={action} />
        ) } />
      </Switch>
    )
  }
}
