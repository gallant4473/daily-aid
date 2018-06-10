import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { createEpicMiddleware } from 'redux-observable'

import rootReducer from './container/reducers'
import rootEpic from './container/epics'
import Main from './container/Main'
import Status from './container/Status'
import ModalComponent from './container/Modal'
import Header from './container/Header'

const epicMiddleware = createEpicMiddleware(rootEpic)
const store = createStore(rootReducer, applyMiddleware(epicMiddleware))

const RootComponent = () => (
  <Provider store={store} >
    <Router>
      <Fragment>
        <Status />
        <ModalComponent />
        <Header />
        <Main />
      </Fragment>
    </Router>
  </Provider>
)

export default RootComponent
