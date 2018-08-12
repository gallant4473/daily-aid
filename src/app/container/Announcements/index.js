import React from 'react'
import { NoDataFound } from '../../components'

const Announcements = () => (
  <div className='container-fluid' style={{ marginTop: 20, marginBottom: 20 }} >
    <div className='card' style={{ minHeight: 'calc(100vh - 100px)' }} >
      <div className='card-header'>Announcements</div>
      <div className='card-body'>
        <NoDataFound message='No announcements found' />
      </div>
    </div>
  </div>
)

export default Announcements
