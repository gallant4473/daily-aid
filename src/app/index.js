import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import 'react-hot-loader/patch'

import RootComponent from './root'
import '../assets/styles/index.scss'

const render = (Component) => {
  ReactDOM.render(<AppContainer><Component /></AppContainer>, document.getElementById('app'))
}

render(RootComponent)

if (module.hot) {
  module
    .hot
    .accept('./root', () => {
      render(RootComponent)
    })
}
