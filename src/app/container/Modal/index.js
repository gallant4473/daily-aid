import React, { Component } from 'react'
import { Modal } from 'reusable-react-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { modalCloseAction } from '../Modal/logic'
import { Premium } from '../../components'
import AddComplaint from '../AddComplaint'
import AddAnnouncement from '../AddAnnouncement'

class ModalComponent extends Component {
  renderType () {
    if (this.props.modal.type === 'premium') {
      return <Premium />
    } else if (this.props.modal.type === 'complaint') {
      return <AddComplaint data={this.props.modal.data} />
    } else if (this.props.modal.type === 'announcement') {
      return <AddAnnouncement data={this.props.modal.data} />
    }
    return null
  }
  render () {
    const {
      dialog, open, size
    } = this.props.modal
    return (
      <Modal dialog={dialog} open={open} onClose={this.props.modalCloseAction} size={size}>
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
    type: PropTypes.string.isRequired,
    data: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.array])
  }).isRequired,
  modalCloseAction: PropTypes.func.isRequired
}
ModalComponent.defaultProps = {
}

const mapStateToProps = state => ({
  modal: state.modal
})

export default connect(mapStateToProps, { modalCloseAction })(ModalComponent)
