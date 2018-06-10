import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import { Loader } from '../../components'

const DashboardPage = Loadable({
  loader: () => import('../../components/Dashboard'),
  loading() {
    return <Loader loading error={false} />
  }
})

const LoginPage = Loadable({
  loader: () => import('../Login'),
  loading() {
    return <Loader loading error={false} />
  }
})

const Main = () => (
  <Switch>
    <Route exact path='/' component={LoginPage} />
    <Route exact path='/dashboard' component={DashboardPage} />
  </Switch>
)

export default Main
