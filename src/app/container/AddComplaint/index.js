import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComplaintAction, editComplaintAction, getAllNoRefreshComplaintAction, getComplaintAction, getAllComplaintAction } from '../Complaint/logic'
import { modalCloseAction } from '../Modal/logic'
import { getCookie } from '../../utils'

class AddComplaint extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: this.props.data ? this.props.data.title : '',
      name: this.props.data ? this.props.data.name : '',
      email: this.props.data ? this.props.data.email : '',
      number: this.props.data ? this.props.data.contact_number : '',
      commonArea: this.props.data ? this.props.data.location ? this.props.data.location.common_area : '' : '',
      apartment: this.props.data ? this.props.data.location ? this.props.data.location.apartment : '' : '',
      facilities: this.props.data ? this.props.data.location ? this.props.data.location.facilities : '' : '',
      details: this.props.data ? this.props.data.details : ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    const id = getCookie('data')
    if (nextProps.addComplaint.flag !== this.props.addComplaint.flag && nextProps.addComplaint.flag) {
      this.props.modalCloseAction()
      this.props.getAllComplaintAction({
        id: id.user_id
      })
    }
    if (nextProps.edit.flag !== this.props.edit.flag && nextProps.edit.flag) {
      this.props.modalCloseAction()
      this.props.getAllNoRefreshComplaintAction({
        id: id.user_id
      })
      this.props.getComplaintAction({
        id: this.props.data.complaint_id
      })
    }
  }
  onSubmit (e) {
    e.preventDefault()
    if (this.props.data) {
      this.props.editComplaintAction({
        data: {
          title: this.state.title,
          location: {
            common_area: this.state.commonArea,
            apartment: this.state.apartment,
            facilities: this.state.facilities
          },
          details: this.state.details,
          name: this.state.name,
          contact_number: this.state.number,
          email: this.state.email
        },
        id: this.props.data.complaint_id
      })
    } else {
      this.props.addComplaintAction({
        data: {
          title: this.state.title,
          location: {
            common_area: this.state.commonArea,
            apartment: this.state.apartment,
            facilities: this.state.facilities
          },
          details: this.state.details,
          name: this.state.name,
          contact_number: this.state.number,
          email: this.state.email
        }
      })
    }
  }
  onChange (value, key) {
    this.setState({
      [key]: value
    })
  }
  render () {
    return (
      <div>
        <div className='modal-header'>
          <h5 className='modal-title'>Complaint Form</h5>
        </div>
        <form onSubmit={e => this.onSubmit(e)} >
          <div className='modal-body' style={{ height: 500, overflow: 'auto' }} >
            <div className='form-group'>
              <label>Name</label>
              <input value={this.state.name} onChange={e => this.onChange(e.target.value, 'name')} type='text' className='form-control' placeholder='Enter Name' required />
            </div>
            <div className='form-group'>
              <label>Title</label>
              <input value={this.state.title} onChange={e => this.onChange(e.target.value, 'title')} type='text' className='form-control' placeholder='Enter Title' required />
            </div>
            <div className='form-group'>
              <label>Email</label>
              <input value={this.state.email} onChange={e => this.onChange(e.target.value, 'email')} type='email' className='form-control' placeholder='Enter Email' required />
            </div>
            <div className='form-group'>
              <label>Contact No</label>
              <input value={this.state.number} onChange={e => this.onChange(e.target.value, 'number')} type='phone' className='form-control' placeholder='Enter Contact No' required />
            </div>
            <div className='form-group'>
              <label>Common Area</label>
              <input value={this.state.commonArea} onChange={e => this.onChange(e.target.value, 'commonArea')} type='text' className='form-control' placeholder='Enter Common Area' required />
            </div>
            <div className='form-group'>
              <label>Apartment</label>
              <input value={this.state.apartment} onChange={e => this.onChange(e.target.value, 'apartment')} type='text' className='form-control' placeholder='Enter Apartment' required />
            </div>
            <div className='form-group'>
              <label>Facilities</label>
              <input value={this.state.facilities} onChange={e => this.onChange(e.target.value, 'facilities')} type='text' className='form-control' placeholder='Enter Facilities' required />
            </div>
            <div className='form-group'>
              <label>Details</label>
              <textarea value={this.state.details} onChange={e => this.onChange(e.target.value, 'details')} type='text' className='form-control' placeholder='Enter Details' required />
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' onClick={() => this.props.modalCloseAction()} className='btn btn-secondary' >Close</button>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  addComplaint: state.addComplaint,
  edit: state.editComplaint
})

export default connect(mapStateToProps, {
  addComplaintAction, editComplaintAction, modalCloseAction, getAllNoRefreshComplaintAction, getComplaintAction, getAllComplaintAction
})(AddComplaint)
