import React from 'react'
import PropTypes from 'prop-types'

const NoDataFound = props => (
  <div>{props.message || 'No Data Found'}</div>
)

NoDataFound.propTypes = {
  message: PropTypes.string
}
NoDataFound.defaultProps = {
  message: ''
}

export default NoDataFound
