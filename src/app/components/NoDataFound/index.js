import React from 'react'
import PropTypes from 'prop-types'

const NoDataFound = props => (
  <div
    style={{
      height: props.height, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}
  >
    {props.message || 'No Data Found'}
  </div>
)

NoDataFound.propTypes = {
  message: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}
NoDataFound.defaultProps = {
  message: '',
  height: '70vh'
}

export default NoDataFound
