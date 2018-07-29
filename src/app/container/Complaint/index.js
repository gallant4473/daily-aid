import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getAllComplaintAction, getComplaintAction } from './logic'
import { modalAction } from '../Modal/logic'
import { getCookie } from '../../utils'
import { Loader } from '../../components'

class Complaint extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: null
    }
    this.toggle = this.toggle.bind(this)
    this.openModal = this.openModal.bind(this)
  }
  componentDidMount () {
    const id = getCookie('data')
    this.props.getAllComplaintAction({
      id: getCookie('permissions') === 'true' ? '' : id.user_id
    })
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.getAll.flag !== this.props.getAll.flag && nextProps.getAll.flag) {
      this.setState({
        open: null
      })
    }
  }
  openModal (status) {
    if (status) {
      this.props.modalAction({
        type: 'complaint',
        open: true,
        dialog: true,
        size: 'large',
        data: Object.keys(this.props.get.data).length ? this.props.get.data : undefined
      })
    } else {
      this.props.modalAction({
        type: 'complaint',
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
        this.props.getComplaintAction({
          id: item.complaint_id
        })
      })
    }
  }
  renderList () {
    const data = this.props.get
    if (this.props.getAll.data.length === 0) {
      return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '70vh' }} >
          No Complaints Registered yet
        </div>
      )
    }
    return this.props.getAll.data.map((item, i) => (
      <Fragment key={i} >
        <li role='presentation' onClick={() => this.toggle(i, item)} className='hand list-group-item d-flex justify-content-between align-items-center'>
          {item.title}
          <span className='badge badge-info badge-pill'>Complaint status: {item.status}</span>
        </li>
        {this.state.open === i && (
          <li className='list-group-item bg-light' style={{ position: 'relative', minHeight: 200 }} >
            <Loader loading={data.loading} error={data.error} height={200} >
              {getCookie('permissions') === 'false' && (
                <div className='d-flex align-items-center justify-content-end' >
                  <button onClick={() => this.openModal(true)} type='button' className='btn btn-primary btn-sm'>Edit</button>
                </div>
              )}
              <div className='d-flex align-items-center' >
                <div className='font-weight-bold' style={{ width: 150 }}>Name:</div>
                <div >{data.data.name}</div>
              </div>
              <div className='d-flex align-items-center' >
                <div className='font-weight-bold' style={{ width: 150 }}>Title:</div>
                <div >{data.data.title}</div>
              </div>
              <div className='d-flex align-items-center' >
                <div className='font-weight-bold' style={{ width: 150 }}>Complaint Status:</div>
                <div >{data.data.status}</div>
              </div>
              <div className='d-flex align-items-center' >
                <div className='font-weight-bold' style={{ width: 150 }}>Progress:</div>
                <div >{data.data.status_by_admin}</div>
              </div>
              <div className='d-flex align-items-center' >
                <div className='font-weight-bold' style={{ width: 150 }}>Email:</div>
                <div >{data.data.email}</div>
              </div>
              <div className='d-flex align-items-center' >
                <div className='font-weight-bold' style={{ width: 150 }}>Contact Number:</div>
                <div >{data.data.contact_number}</div>
              </div>
              <div className='d-flex align-items-center' >
                <div className='font-weight-bold' style={{ width: 150 }}>Commom Area:</div>
                {data.data.location && <div >{data.data.location.common_area}</div>}
              </div>
              <div className='d-flex align-items-center' >
                <div className='font-weight-bold' style={{ width: 150 }}>Apartment:</div>
                {data.data.location && <div >{data.data.location.apartment}</div>}
              </div>
              <div className='d-flex align-items-center' >
                <div className='font-weight-bold' style={{ width: 150 }}>Facilities:</div>
                {data.data.location && <div >{data.data.location.facilities}</div>}
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
      <Loader loading={this.props.getAll.loading} error={this.props.getAll.error} >
        {getCookie('permissions') === 'false' && (
          <div className='d-flex align-items-center justify-content-end' style={{ marginBottom: 10 }} >
            <button onClick={() => this.openModal(false)} type='button' className='btn btn-primary btn-sm'>Add Complaint</button>
          </div>
        )}
        <ul className='list-group'>
          {this.renderList()}
        </ul>
      </Loader>
    )
  }
}

const mapStateToProps = state => ({
  getAll: state.getAllComplaint,
  get: state.getComplaint
})

export default connect(mapStateToProps, {
  getAllComplaintAction, getComplaintAction, modalAction
})(Complaint)
