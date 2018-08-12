import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'
import { Loader } from '../../components'
import Drawer from '../Drawer'

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

const Main = (props) => {
  if (props.drawer.open) {
    document.body.scrollTop = 0
    document.body.style.overflow = 'hidden'
  } else {
    document.body.scrollTop = 0
    document.body.style.overflow = 'auto'
  }
  return (
    <div className={props.drawer.open ? 'overlay' : ''} >
      <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route exact path='/dashboard' component={DashboardPage} />
      </Switch>
      <Drawer outsideClickIgnoreClass='drawer-button' />
    </div>
  )
}

const mapStateToProps = state => ({
  drawer: state.drawer
})

export default connect(mapStateToProps, {})(Main)
