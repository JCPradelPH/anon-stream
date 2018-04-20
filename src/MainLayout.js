import React from 'react'
import {BrowserRouter,HashRouter} from 'react-router-dom'
import Routers from './Routers'
export default class MainLayout extends React.Component{

  render(){
    return(
      process.env.NODE_ENV=='production'?
      <HashRouter>
        <Routers />
      </HashRouter> :
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    )
  }
}
