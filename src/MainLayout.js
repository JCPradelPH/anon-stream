import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import Routers from './Routers'
export default class MainLayout extends React.Component{
  componentDidMount(){

  }
  render(){
    return(
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    )
  }
}
