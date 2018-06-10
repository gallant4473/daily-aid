import React, { Component } from 'react'
import { connect } from 'react-redux'

class User extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: 'Welcome User'
    }
  }
  render () {
    return (
      <div className='container-fluid' style={{ marginTop: 20 }} >
        <div className='card' style={{ minHeight: '70vh' }} >
          <div className='card-body d-flex align-items-center justify-content-center' >
            <h2>{this.state.message}</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, {})(User)
