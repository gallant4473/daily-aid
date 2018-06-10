import React from 'react'
import { getCookie } from '../../utils'
import Admin from '../../container/Admin'
import User from '../../container/User'

const Dashboard = () => {
  if (getCookie('permissions') === 'true') {
    return (
      <Admin />
    )
  }
  return (
    <User />
  )
}

export default Dashboard
