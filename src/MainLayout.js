import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {HeaderLogo} from './components'
import Background from '../css/images/banner.jpeg';
let contentStyle = {
  backgroundImage: 'url(' + Background + ')',
  backgroundSize: 'cover'
}
export default class MainLayout extends React.Component{
  componentDidMount(){

  }
  render(){
     const width = "200px"
     const height = "auto"
    return(
      <BrowserRouter>
        <div id="main-container">
          <header>
            <HeaderLogo width={width} height={height} />
          </header>
          <section id="main-content" style={contentStyle}>

          </section>
          <footer class="panel-footer">

          </footer>
        </div>
      </BrowserRouter>
    )
  }
}
