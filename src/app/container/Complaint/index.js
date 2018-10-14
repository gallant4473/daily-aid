import React, { Component, Fragment } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { connect } from 'react-redux'
import { getAllComplaintAction, getComplaintAction, editComplaintAction } from './logic'
import { modalAction } from '../Modal/logic'
import { getCookie } from '../../utils'
import { Loader } from '../../components'

const STATUS = ['Open', 'Close', 'Withdrawn']
const PROGRESS = ['Accepted', 'Rejected', 'Pending', 'Resolved', 'In Progress', 'Withdrawn']

class Complaint extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: null,
      openDropdown: false
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
    if (nextProps.getAll.data !== this.props.getAll.data && nextProps.getAll.data.length) {
      if (this.state.open) {
        this.props.getComplaintAction({
          id: nextProps.getAll.data[this.state.open].complaint_id
        })
      }
    }
    if (nextProps.edit.flag !== this.props.edit.flag && nextProps.edit.flag) {
      this.props.getComplaintAction({
        id: nextProps.getAll.data[this.state.open].complaint_id
      })
    }
    if (nextProps.addComplaint.flag !== this.props.addComplaint.flag && nextProps.addComplaint.flag) {
      this.setState({
        open: null
      })
    }
  }
  onStatusChange (d, status, key) {
    const data = JSON.parse(JSON.stringify(d))
    this.props.editComplaintAction({
      data: {
        title: data.title,
        location: {
          common_area: data.location.commonArea,
          apartment: data.location.apartment,
          facilities: data.location.facilities
        },
        details: data.details,
        name: data.name,
        contact_number: data.number,
        email: data.email,
        [key]: status
      },
      id: data.complaint_id
    })
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
        open: null,
        openDropdown: false
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
  renderProgress () {
    const data = this.props.get
    if (getCookie('permissions') === 'false') {
      return <div className='custom-spacing' >{data.data.status_by_admin}</div>
    }
    return (
      <Dropdown size="sm" isOpen={this.state.openDropdown} toggle={() => this.setState({ openDropdown: !this.state.openDropdown })}>
        <DropdownToggle nav className="nav-link" caret>
          {data.data.status_by_admin}
        </DropdownToggle>
        <DropdownMenu>
          {PROGRESS.map((d, j) => (
            <Fragment key={j} >
              <DropdownItem onClick={() => this.onStatusChange(data.data, d, 'status_by_admin')} className='hand' >{d}</DropdownItem>
              {j !== PROGRESS.length - 1 && <DropdownItem divider />}
            </Fragment>
          ))}
        </DropdownMenu>
      </Dropdown>
    )
  }
  renderStatus () {
    const data = this.props.get
    if (getCookie('permissions') === 'false') {
      return (
        <Dropdown size="sm" isOpen={this.state.openDropdown} toggle={() => this.setState({ openDropdown: !this.state.openDropdown })}>
          <DropdownToggle nav className="nav-link" caret>
            {data.data.status}
          </DropdownToggle>
          <DropdownMenu>
            {STATUS.map((d, j) => (
              <Fragment key={j} >
                <DropdownItem onClick={() => this.onStatusChange(data.data, d, 'status')} className='hand' >{d}</DropdownItem>
                {j !== STATUS.length - 1 && <DropdownItem divider />}
              </Fragment>
            ))}
          </DropdownMenu>
        </Dropdown>
      )
    }
    return (
      <div className='custom-spacing' >{data.data.status}</div>
    )
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
          {getCookie('permissions') === 'false' ? <span className='badge badge-info badge-pill'>Progress: {item.status_by_admin}</span> : <span className='badge badge-info badge-pill'>Complaint status: {item.status}</span>}
        </li>
        {this.state.open === i && (
          <li className='list-group-item bg-light' style={{ position: 'relative', minHeight: 200 }} >
            <Loader loading={data.loading} error={data.error} height={440} >
              {getCookie('permissions') === 'false' && (
                <div className='d-flex align-items-center justify-content-end' >
                  <button onClick={() => this.openModal(true)} type='button' className='btn btn-primary btn-sm'>Edit</button>
                </div>
              )}
              <div className='d-flex align-items-center' >
                <div className='font-weight-bold' style={{ width: 150 }}>Name:</div>
                <div className='custom-spacing' >{data.data.name}</div>
              </div>
              <div className='d-flex align-items-center' >
                <div className='font-weight-bold' style={{ width: 150 }}>Title:</div>
                <div className='custom-spacing' >{data.data.title}</div>
              </div>
              <div className='d-flex align-items-center' >
                <div className='font-weight-bold' style={{ width: 150 }}>Complaint Status:</div>
                {this.renderStatus()}
              </div>
              <div className='d-flex align-items-center' >
                <div className='font-weight-bold' style={{ width: 150 }}>Progress:</div>
                {this.renderProgress()}
              </div>
              <div className='d-flex align-items-center' >
                <div className='font-weight-bold' style={{ width: 150 }}>Email:</div>
                <div className='custom-spacing' >{data.data.email}</div>
              </div>
              <div className='d-flex align-items-center' >
                <div className='font-weight-bold' style={{ width: 150 }}>Contact Number:</div>
                <div className='custom-spacing' >{data.data.contact_number}</div>
              </div>
              <div className='d-flex align-items-center' >
                <div className='font-weight-bold' style={{ width: 150 }}>Commom Area:</div>
                {data.data.location && <div className='custom-spacing' >{data.data.location.common_area}</div>}
              </div>
              <div className='d-flex align-items-center' >
                <div className='font-weight-bold' style={{ width: 150 }}>Apartment:</div>
                {data.data.location && <div className='custom-spacing' >{data.data.location.apartment}</div>}
              </div>
              <div className='d-flex align-items-center' >
                <div className='font-weight-bold' style={{ width: 150 }}>Facilities:</div>
                {data.data.location && <div className='custom-spacing' >{data.data.location.facilities}</div>}
              </div>
              <div className='d-flex align-items-center' >
                <div className='font-weight-bold' style={{ width: 150 }}>Details:</div>
                <div className='custom-spacing' >{data.data.details}</div>
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
          <div className='card-header'>Complaints</div>
          <div className='card-body'>
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
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  getAll: state.getAllComplaint,
  get: state.getComplaint,
  edit: state.editComplaint,
  addComplaint: state.addComplaint,
})

export default connect(mapStateToProps, {
  getAllComplaintAction, getComplaintAction, modalAction, editComplaintAction
})(Complaint)
