import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'

import '../css/fontawesome-all.min.css'
import '../css/bootstrap.min.css'
import '../dist/css/style.css'

import MainLayout from './MainLayout'

const app = document.getElementById("app")
ReactDOM.render(<MainLayout />, app)
