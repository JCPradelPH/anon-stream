import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'

import '../css/fontawesome-all.min.css'
import '../css/bootstrap.min.css'
import '../dist/css/style.css'

import MainLayout from './MainLayout'
import {configureStore} from './redux/configureStore'

let initialState = {
  sample: {}
}
const {store, action} = configureStore({initialState})
const app = document.getElementById("app")
ReactDOM.render(<MainLayout store={store} action={action} />, app)
