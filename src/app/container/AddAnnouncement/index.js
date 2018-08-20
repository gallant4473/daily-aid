import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addAnnouncementAction, editAnnouncementAction, getAllAnnouncementAction } from '../Announcements/logic'
import { modalCloseAction } from '../Modal/logic'

class AddAnnouncement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: this.props.data ? this.props.data.title : '',
      details: this.props.data ? this.props.data.details : ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.addAnnouncement.flag !== this.props.addAnnouncement.flag && nextProps.addAnnouncement.flag) {
      this.props.modalCloseAction()
      this.props.getAllAnnouncementAction()
    }
    if (nextProps.edit.flag !== this.props.edit.flag && nextProps.edit.flag) {
      this.props.modalCloseAction()
      this.props.getAllAnnouncementAction()
    }
  }
  onSubmit (e) {
    e.preventDefault()
    if (this.props.data) {
      this.props.editAnnouncementAction({
        data: {
          title: this.state.title,
          details: this.state.details
        },
        id: this.props.data.announcement_id
      })
    } else {
      this.props.addAnnouncementAction({
        data: {
          title: this.state.title,
          details: this.state.details
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
          <h5 className='modal-title'>Announcements Form</h5>
        </div>
        <form onSubmit={e => this.onSubmit(e)} >
          <div className='modal-body' style={{ height: 250, overflow: 'auto' }} >
            <div className='form-group'>
              <label>Title</label>
              <input value={this.state.title} onChange={e => this.onChange(e.target.value, 'title')} type='text' className='form-control' placeholder='Enter Title' required />
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
  addAnnouncement: state.addAnnouncement,
  edit: state.editAnnouncement
})

export default connect(mapStateToProps, {
  addAnnouncementAction, editAnnouncementAction, modalCloseAction, getAllAnnouncementAction
})(AddAnnouncement)
