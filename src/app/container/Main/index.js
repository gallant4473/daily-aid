import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import { Loader } from '../../components'
import Drawer from '../Drawer'

const DashboardPage = Loadable({
  loader: () => import('../Announcements'),
  loading() {
    return <Loader loading error={false} />
  }
})

const ComplaintPage = Loadable({
  loader: () => import('../Complaint'),
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

const UserPage = Loadable({
  loader: () => import('../User'),
  loading() {
    return <Loader loading error={false} />
  }
})

const Main = () => (
  <Fragment>
    <Switch>
      <Route exact path='/' component={LoginPage} />
      <Route exact path='/dashboard' component={DashboardPage} />
      <Route exact path='/complaints' component={ComplaintPage} />
      <Route exact path='/users' component={UserPage} />
    </Switch>
    <Drawer />
  </Fragment>
)

export default Main
