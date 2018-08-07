import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import { logoutAction } from '../Login/logic'
import { drawerAction } from '../Drawer/logic'

class Header extends Component {
  constructor (props) {
    super(props)
    this.openDrawer = this.openDrawer.bind(this)
  }
  openDrawer () {
    if (this.props.drawer.open) {
      this.props.drawerAction({
        open: false,
        type: ''
      })
    } else {
      this.props.drawerAction({
        type: 'notification',
        open: true
      })
    }
  }
  render () {
    if (this.props.location.pathname !== '/') {
      return (
        <Navbar className='navbar-light header-layout' expand='md'>
          <NavbarBrand className='mr-auto'>DAILY AID</NavbarBrand>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink onClick={() => this.props.logoutAction({})} >Logout</NavLink>
            </NavItem>
            <NavItem>
              <button onClick={this.openDrawer} type='button' className='drawer-button'>
                <span className='navbar-toggler-icon' />
              </button>
            </NavItem>
          </Nav>
        </Navbar>
      )
    }
    return null
  }
}

const mapStateToProps = state => ({
  drawer: state.drawer
})

export default withRouter(connect(mapStateToProps, { logoutAction, drawerAction })(Header))
