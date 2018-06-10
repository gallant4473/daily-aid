import React, { Component } from 'react'
import { Modal } from 'reusable-react-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { modalCloseAction } from '../Modal/logic'
import { Premium } from '../../components'

class ModalComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      there: ''
    }
  }
  renderType () {
    if (this.props.modal.type === 'premium') {
      return <Premium />
    }
    return null
  }
  render () {
    const {
      dialog, open, size
    } = this.props.modal
    return (
      <Modal dialog={dialog} open={open} onClose={this.props.modalCloseAction} size={size}>
        {this.state.there}
        {this.renderType()}
      </Modal>
    )
  }
}

ModalComponent.propTypes = {
  modal: PropTypes.shape({
    dialog: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    size: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  modalCloseAction: PropTypes.func.isRequired
}
ModalComponent.defaultProps = {
}

const mapStateToProps = state => ({
  modal: state.modal
})

export default connect(mapStateToProps, { modalCloseAction })(ModalComponent)
