import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class OutsideClick extends Component {
  constructor (props) {
    super(props)
    this.getContainer = this.getContainer.bind(this)
    this.isTouch = false
    this.handle = this.handle.bind(this)
    this.checkIfClickWithinListenBoundary = this.checkIfClickWithinListenBoundary.bind(this);
    this.checkifClickWithinIgnoreBoundary = this.checkifClickWithinIgnoreBoundary.bind(this);
  }

  componentDidMount () {
    document.addEventListener('touchend', this.handle, true)
    document.addEventListener('click', this.handle, true)
  }

  componentWillUnmount () {
    document.removeEventListener('touchend', this.handle, true)
    document.removeEventListener('click', this.handle, true)
  }

  getContainer (ref) {
    this.container = ref
  }

  checkIfClickWithinListenBoundary(node) {
    if (!this.props.listenClickWithinClass) {
      return true;
    }

    return document.querySelector(`.${this.props.listenClickWithinClass}`).contains(node)
  }

  checkifClickWithinIgnoreBoundary(node) {
    if (!this.props.ignoreClickWithinClass) {
      return true;
    }
    return !document.querySelector(`.${this.props.ignoreClickWithinClass}`).contains(node);
  }

  handle (e) {
    if (e.type === 'touchend') this.isTouch = true
    if (e.type === 'click' && this.isTouch) return
    const { onClickOutside } = this.props
    const el = this.container
    if (!el.contains(e.target) && this.checkIfClickWithinListenBoundary(e.target) && this.checkifClickWithinIgnoreBoundary(e.target)) {
      onClickOutside(e)
    }
  }

  render () {
    const {
      children, onClickOutside, listenClickWithinClass, ignoreClickWithinClass, ...props
    } = this.props
    return <div {...props} ref={this.getContainer}>{children}</div>
  }
}

OutsideClick.propTypes = {
  onClickOutside: PropTypes.func.isRequired,
  listenClickWithinClass: PropTypes.string,
  ignoreClickWithinClass: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

OutsideClick.defaultProps = {
  children: null,
  listenClickWithinClass: null,
  ignoreClickWithinClass: null
}
