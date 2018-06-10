import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dropdown } from 'reusable-react-components'
import { loginAction, signupAction } from './logic'
import { getCookie } from '../../utils'

const Condominium = [
  'OTC',
  'KT',
  'LG'
]

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      userName: '',
      password: '',
      confirmPassword: '',
      condominium: '',
      activeTab: 1
    }
    this.toggle = this.toggle.bind(this)
    this.onSubmitForm = this.onSubmitForm.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  componentDidMount () {
    if (getCookie('accessToken')) {
      this.props.history.replace(process.env.redirectRoute)
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.status.type !== this.props.status.type && nextProps.status.type === 'signup') {
      this.toggle(1)
    }
  }
  onSubmitForm (e, type) {
    e.preventDefault()
    if (type === 'signup') {
      const {
        email, condominium, password, userName
      } = this.state
      this.props.signupAction({
        email,
        condominium,
        password,
        user_name: userName
      })
    } else {
      this.props.loginAction({
        user_name: this.state.userName,
        password: this.state.password
      })
    }
  }
  onChange (value, key) {
    this.setState({
      [key]: value
    })
  }
  toggle (value) {
    this.setState({
      activeTab: value,
      email: '',
      userName: '',
      password: '',
      confirmPassword: '',
      condominium: ''
    })
  }
  renderContent () {
    if (this.state.activeTab === 1) {
      return (
        <form onSubmit={e => this.onSubmitForm(e, 'signin')} >
          <input onChange={e => this.onChange(e.target.value, 'userName')} value={this.state.userName} type='text' className='form-control first' placeholder='User Name' required />
          <input onChange={e => this.onChange(e.target.value, 'password')} value={this.state.password} type='password' className='form-control last' placeholder='Password' required />
          <button className='btn btn-lg btn-primary btn-block' type='submit'>Sign in</button>
        </form>
      )
    }
    const disabled = this.state.password !== this.state.confirmPassword || this.state.condominium === ''
    return (
      <form onSubmit={e => this.onSubmitForm(e, 'signup')} >
        <input onChange={e => this.onChange(e.target.value, 'email')} value={this.state.email} type='email'className='form-control first' placeholder='Email address' required />
        <input onChange={e => this.onChange(e.target.value, 'userName')} value={this.state.userName} type='text' className='form-control middle' placeholder='User Name' required />
        <Dropdown title='Select Condominium' options={Condominium} active={this.state.condominium} onChange={value => this.onChange(value, 'condominium')} />
        <input onChange={e => this.onChange(e.target.value, 'password')} value={this.state.password} type='password' className='form-control middle' placeholder='Password' required />
        <input onChange={e => this.onChange(e.target.value, 'confirmPassword')} value={this.state.confirmPassword} type='password' className='form-control last' placeholder='Confirm Password' required />
        <button className={disabled ? 'btn btn-lg btn-primary btn-block disabled' : 'btn btn-lg btn-primary btn-block'} type='submit'>Sign up</button>
      </form>
    )
  }
  render () {
    return (
      <div className='login-page' >
        <div className='login-container form-signin' >
          <ul className='nav nav-tabs'>
            <li className='nav-item'>
              <a role='presentation' onClick={() => this.toggle(1)} className={this.state.activeTab === 1 ? 'nav-link active' : 'nav-link'}>Log In</a>
            </li>
            <li className='nav-item'>
              <a role='presentation' onClick={() => this.toggle(2)} className={this.state.activeTab === 2 ? 'nav-link active' : 'nav-link'}>Sign Up</a>
            </li>
          </ul>
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  login: state.login,
  status: state.status
})

export default connect(mapStateToProps, { loginAction, signupAction })(Login)
