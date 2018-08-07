import React, { Component } from 'react'
import onClickOutside from 'react-onclickoutside'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { drawerAction } from '../Drawer/logic'

class Drawer extends Component {
  handleClickOutside () {
    this.props.drawerAction({
      open: false,
      type: ''
    })
  }
  render () {
    return (
      <div className={this.props.drawer.open ? 'drawer-left open' : 'drawer-left'} >
        hello
      </div>
    )
  }
}

const mapStateToProps = state => ({
  drawer: state.drawer
})

export default withRouter(connect(mapStateToProps, {
  drawerAction
})(onClickOutside(Drawer)))
