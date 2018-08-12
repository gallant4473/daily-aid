import React from 'react'
import { getCookie } from '../../utils'
import Announcements from '../../container/Announcements'
import User from '../../container/User'

const Dashboard = () => {
  if (getCookie('permissions') === 'true') {
    return (
      <Announcements />
    )
  }
  return (
    <User />
  )
}

export default Dashboard
