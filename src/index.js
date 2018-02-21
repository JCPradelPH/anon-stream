import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'

import '../css/bootstrap.min.css'
import '../css/flexbox.css'
import '../css/style.css'

import MainLayout from './MainLayout'
import {configureStore} from './redux/configureStore'

let initialState = {
  initialState: {
    sample: {}
  }
}
const {store, action} = configureStore({initialState})
const app = document.getElementById("app")
ReactDOM.render(<MainLayout store={store} action={action} />, app)
