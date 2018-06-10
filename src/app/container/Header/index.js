// import React from 'react'
// import { withRouter } from 'react-router-dom'
// import { Navbar, NavbarBrand } from 'reactstrap'

// const Header = (props) => {
//   const renderHeader = props.location.pathname !== '/' ? (

//   ) : null
//   return (
//     <div>
//       {renderHeader}
//     </div>
//   )
// }

// export default withRouter(Header)

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Navbar, NavbarBrand, Collapse, Nav, NavItem, NavLink, NavbarToggler } from 'reactstrap'
import { logoutAction } from '../Login/logic'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.toggle = this.toggle.bind(this)
  }
  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render () {
    if (this.props.location.pathname !== '/') {
      return (
        <Navbar className='navbar-light header-layout' expand='md'>
          <NavbarBrand className='mr-auto'>DAILY AID</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink onClick={() => this.props.logoutAction({})} >Logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      )
    }
    return null
  }
}

export default withRouter(connect(null, { logoutAction })(Header))
