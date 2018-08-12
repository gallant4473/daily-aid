import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { drawerAction } from '../Drawer/logic'
import { logoutAction } from '../Login/logic'
import { OutsideClick } from '../../components'
import { getCookie } from '../../utils'

class Drawer extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.drawer.open) {
      document.body.scrollTop = 0
      document.body.style.overflow = 'hidden'
    } else {
      document.body.scrollTop = 0
      document.body.style.overflow = 'auto'
    }
  }
  handleClickOutside (e, flag) {
    this.props.drawerAction({
      open: false,
      type: ''
    })
    if (flag) {
      e.preventDefault()
      this.props.logoutAction()
    }
  }
  render () {
    const admin = getCookie('permissions') === 'true'
    return (
      <div className={this.props.drawer.open ? 'overlay' : ''} >
        <OutsideClick onClickOutside={() => this.handleClickOutside()} ignoreClickWithinClass='drawer-icon-open' >
          <div className={this.props.drawer.open ? 'drawer-left open' : 'drawer-left'} >
            <div className='list-group'>
              <Link onClick={() => this.handleClickOutside()} to='/dashboard' className='list-group-item list-group-item-action'>Annoncements</Link>
              {admin && <Link onClick={() => this.handleClickOutside()} to='/users' className='list-group-item list-group-item-action'>Users</Link>}
              <Link onClick={() => this.handleClickOutside()} to='complaints' className='list-group-item list-group-item-action'>Complaints</Link>
              <a href='#' onClick={e => this.handleClickOutside(e, true)} className='list-group-item list-group-item-action'>Logout</a>
            </div>
          </div>
        </OutsideClick>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  drawer: state.drawer
})

export default withRouter(connect(mapStateToProps, {
  drawerAction,
  logoutAction
})(Drawer))
