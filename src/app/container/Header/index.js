import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap'
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
        <Navbar className='navbar-dark bg-primary header-layout' expand='md'>
          <NavbarBrand className='mr-auto'>DAILY AID</NavbarBrand>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <button onClick={this.openDrawer} type='button' className='drawer-button drawer-icon-open'>
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

export default withRouter(connect(mapStateToProps, { drawerAction })(Header))
