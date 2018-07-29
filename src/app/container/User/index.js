import React, { Component } from 'react'
import { connect } from 'react-redux'
import Complaint from '../Complaint'

class User extends Component {
  render () {
    return (
      <div className='container-fluid' style={{ marginTop: 20 }} >
        <div className='card' style={{ minHeight: '70vh' }} >
          <div className='card-body' >
            <Complaint />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, {})(User)
