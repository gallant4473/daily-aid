import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserAction, approveAction, activateAction } from './logic'
import { Loader, NoDataFound } from '../../components'

class Admin extends Component {
  componentDidMount () {
    this.props.getUserAction()
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.approve.data !== this.props.approve.data && nextProps.approve.data) {
      this.props.getUserAction()
    }
    if (nextProps.activate.data !== this.props.activate.data && nextProps.activate.data) {
      this.props.getUserAction()
    }
  }
  getApprove (value) {
    const payload = {
      update: [
        {
          user_id: value.user_id,
          status: !value.is_approved
        }
      ]
    }
    this.props.approveAction({
      data: payload
    })
  }
  toggleActivate (value) {
    const payload = {
      update: [
        {
          user_id: value.user_id,
          status: !value.is_active
        }
      ]
    }
    this.props.activateAction({
      data: payload
    })
  }
  renderStatus (item) {
    if (item.is_admin) {
      return (
        <span style={{ width: 100 }} className='badge badge-primary badge-pill'>ADMIN</span>
      )
    }
    if (!item.is_approved) {
      return (
        <button disabled={this.props.activate.loading || this.props.approve.loading} onClick={() => this.getApprove(item)} style={{ width: 100 }} className='btn btn-success'>Approve</button>
      )
    }
    return (
      <button disabled={this.props.activate.loading || this.props.approve.loading} onClick={() => this.toggleActivate(item)} style={{ width: 100 }} className='btn btn-danger'>De activate</button>
    )
  }
  renderlist () {
    if (this.props.user.data.length === 0) {
      return (
        <NoDataFound />
      )
    }
    return this.props.user.data.map((item, i) => (
      <li key={i} className='list-group-item d-flex justify-content-between align-items-center'>
        {item.user_name}
        {this.renderStatus(item)}
      </li>
    ))
  }
  renderContent () {
    return (
      <Loader loading={this.props.user.loading} error={this.props.user.error} height='70vh' >
        <ul className='list-group' style={{ marginTop: 10 }} >
          {this.renderlist()}
        </ul>
      </Loader>
    )
  }

  render () {
    return (
      <div className='container-fluid' style={{ marginTop: 20, marginBottom: 20 }} >
        <div className='card' style={{ minHeight: 'calc(100vh - 100px)' }} >
          <div className='card-header'>Users</div>
          <div className='card-body'>
            {this.renderContent()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.getUser,
  approve: state.approve,
  activate: state.activate
})

export default connect(mapStateToProps, { getUserAction, approveAction, activateAction })(Admin)
