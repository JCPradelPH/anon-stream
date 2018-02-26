import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './containers/Home'
import Room from './containers/Room'
export default class Routers extends React.Component{

  render(){
    return(
      <Switch>
        <Route exact path={'/'} component={Home} />
        <Route exact path={'/room'} component={Room} />
      </Switch>
    )
  }
}
