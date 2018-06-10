import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NotificationSystem from 'react-notification-system'
import { getCookie, removeCookies } from '../../utils'

class Status extends Component {
  componentDidMount () {
    if (typeof (getCookie('accessToken')) === 'undefined' && this.props.location.pathname !== '/') {
      this.props.history.push(process.env.mainRoute)
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.status.type !== this.props.status.type) {
      this.showNotification(nextProps.status)
      this.activityFlow(nextProps.status.type)
    }
    if (typeof (getCookie('accessToken')) === 'undefined' && nextProps.location.pathname !== process.env.mainRoute) {
      this.props.history.push(process.env.mainRoute)
    }
  }
  activityFlow (value) {
    switch (value) {
      case '401': {
        removeCookies()
        break
      }
      case '403': {
        break
      }
      case 'login': {
        this.props.history.replace(process.env.redirectRoute)
        break
      }
      case 'logout': {
        break
      }
      default:
        break
    }
  }
  showNotification (value) {
    const { title, message, status } = value
    this.statusMessage.addNotification({
      title, message, level: status, autoDismiss: 4
    })
  }
  render () {
    return (
      <NotificationSystem ref={(ref) => { this.statusMessage = ref }} />
    )
  }
}

Status.propTypes = {
  status: PropTypes.shape({
    message: PropTypes.string,
    status: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

Status.defaultProps = {
  status: {
    message: '',
    status: '',
    type: '',
    title: ''
  },
  history: {
    push: () => ''
  }
}

const mapStateToProps = state => ({
  status: state.status
})

export default withRouter(connect(mapStateToProps, {})(Status))
