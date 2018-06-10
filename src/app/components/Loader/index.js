import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Loader = ({
  loading, error, height, message, children
}) => {
  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', height
      }}
      >
        <div className='reusable-loader' >
          <div className='reusable-loader-item' />
        </div>
      </div>
    )
  }
  if (error) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', height
      }}
      >
        {message}
      </div>
    )
  }
  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  message: PropTypes.string
}
Loader.defaultProps = {
  height: '100vh',
  message: 'Something went wrong, Please try after some time.'
}

export default Loader
