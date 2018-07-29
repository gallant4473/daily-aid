import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserAction, approveAction, activateAction } from './logic'
import { Loader, NoDataFound } from '../../components'
import Complaint from '../Complaint'

class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: 1
    }
    this.toggle = this.toggle.bind(this)
  }
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
  toggle (value) {
    this.setState({
      activeTab: value
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
    if (this.state.activeTab === 1) {
      return (
        <Loader loading={this.props.user.loading} error={this.props.user.error} height='70vh' >
          <ul className='list-group' style={{ marginTop: 10 }} >
            {this.renderlist()}
          </ul>
        </Loader>
      )
    }
    return (
      <div className='card' style={{ minHeight: '70vh', marginTop: 10, padding: 10 }} >
        <Complaint />
      </div>
    )
  }

  render () {
    return (
      <div className='container-fluid' style={{ marginTop: 20 }} >
        <div className='card' style={{ minHeight: '70vh' }} >
          <div className='card-body'>
            <ul className='nav nav-tabs'>
              <li className='nav-item'>
                <a role='presentation' onClick={() => this.toggle(1)} className={this.state.activeTab === 1 ? 'nav-link active' : 'nav-link'}>Users</a>
              </li>
              <li className='nav-item'>
                <a role='presentation' onClick={() => this.toggle(2)} className={this.state.activeTab === 2 ? 'nav-link active' : 'nav-link'}>Complaints</a>
              </li>
            </ul>
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
