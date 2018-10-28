import React, { Component, Fragment } from 'react'
import Timestamp from 'react-timestamp'
import { connect } from 'react-redux'
import { getAllAnnouncementAction, getAnnouncementAction, deleteAnnouncementAction } from './logic'
import { modalAction } from '../Modal/logic'
import { getCookie } from '../../utils'
import { Loader } from '../../components'

class Announcements extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: null
    }
    this.toggle = this.toggle.bind(this)
    this.openModal = this.openModal.bind(this)
  }
  componentDidMount () {
    this.props.getAllAnnouncementAction()
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.getAll.flag !== this.props.getAll.flag && nextProps.getAll.flag) {
      this.setState({
        open: null
      })
    }
    if (nextProps.delete.flag !== this.props.delete.flag && nextProps.delete.flag) {
      this.props.getAllAnnouncementAction()
    }
  }
  openModal (status) {
    if (status) {
      this.props.modalAction({
        type: 'announcement',
        open: true,
        dialog: true,
        size: 'large',
        data: Object.keys(this.props.get.data).length ? this.props.get.data : undefined
      })
    } else {
      this.props.modalAction({
        type: 'announcement',
        open: true,
        dialog: true,
        size: 'large',
        data: undefined
      })
    }
  }
  toggle (i, item) {
    if (i === this.state.open) {
      this.setState({
        open: null
      })
    } else {
      this.setState({
        open: i
      }, () => {
        this.props.getAnnouncementAction({
          id: item.announcement_id
        })
      })
    }
  }
  renderList () {
    const data = this.props.get
    if (this.props.getAll.data.length === 0) {
      return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '70vh' }} >
          No Announcements Found
        </div>
      )
    }
    return this.props.getAll.data.map((item, i) => (
      <Fragment key={i} >
        <li role='presentation' onClick={() => this.toggle(i, item)} className='hand list-group-item d-flex justify-content-between align-items-center'>
          {item.title}
          <span className='badge badge-info badge-pill'>
            <Timestamp time={new Date(item.created_date).getTime() / 1000} precision={1} />
          </span>
        </li>
        {this.state.open === i && (
          <li className='list-group-item bg-light' style={{ position: 'relative', minHeight: 80 }} >
            <Loader loading={data.loading} error={data.error} height={80} >
              {getCookie('permissions') === 'true' && (
                <div className='d-flex align-items-center justify-content-end' >
                  <button style={{ marginRight: 10 }} onClick={() => this.props.deleteAnnouncementAction({ id: item.announcement_id })} type='button' className='btn btn-danger btn-sm'>
                    Delete
                  </button>
                  <button onClick={() => this.openModal(true)} type='button' className='btn btn-primary btn-sm'>Edit</button>
                </div>
              )}
              <div className='d-flex align-items-center' >
                <div className='font-weight-bold' style={{ width: 150 }}>Title:</div>
                <div >{data.data.title}</div>
              </div>
              <div className='d-flex align-items-center' >
                <div className='font-weight-bold' style={{ width: 150 }}>Details:</div>
                <div >{data.data.details}</div>
              </div>
            </Loader>
          </li>
        )}
      </Fragment>
    ))
  }
  render () {
    return (
      <div className='container-fluid' style={{ marginTop: 20, marginBottom: 20 }} >
        <div className='card' style={{ minHeight: 'calc(100vh - 100px)' }} >
          <div className='card-header'>Announcements</div>
          <div className='card-body'>
            <Loader loading={this.props.getAll.loading} error={this.props.getAll.error} >
              {getCookie('permissions') === 'true' && (
                <div className='d-flex align-items-center justify-content-end' style={{ marginBottom: 10 }} >
                  <button onClick={() => this.openModal(false)} type='button' className='btn btn-primary btn-sm'>Add Announcement</button>
                </div>
              )}
              <ul className='list-group'>
                {this.renderList()}
              </ul>
            </Loader>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  getAll: state.getAllAnnouncement,
  get: state.getAnnouncement,
  delete: state.deleteAnnouncement
})

export default connect(mapStateToProps, {
  getAllAnnouncementAction, getAnnouncementAction, modalAction, deleteAnnouncementAction
})(Announcements)
