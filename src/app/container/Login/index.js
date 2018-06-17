import React, { Component } from 'react'
import { connect } from 'react-redux'
import { parse, stringify } from 'query-string'
import { Dropdown } from 'reusable-react-components'
import { loginAction, signupAction, forgotPasswordAction, checkResetAction, resetPasswordAction } from './logic'
import { getCookie } from '../../utils'
import { Loader } from '../../components'

const Condominium = [
  'OUG',
  'Endah Villa',
  'Koi Tropika'
]

class Login extends Component {
  constructor (props) {
    super(props)
    const q = parse(this.props.location.search)
    this.state = {
      email: '',
      userName: '',
      password: '',
      confirmPassword: '',
      condominium: '',
      activeTab: 1,
      id: q.id ? q.id : ''
    }
    this.toggle = this.toggle.bind(this)
    this.onSubmitForm = this.onSubmitForm.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  componentDidMount () {
    if (getCookie('accessToken')) {
      this.props.history.replace(process.env.redirectRoute)
    } else if (this.state.id) {
      this.props.checkResetAction(stringify({ id: this.state.id }))
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.status.type !== this.props.status.type) {
      if (nextProps.status.type === 'signup' || nextProps.status.type === 'forgot') {
        this.toggle(1)
      }
      if (nextProps.status.type === 'checkReset' || nextProps.status.type === 'resetPassword') {
        this.setState({
          id: '',
          email: '',
          userName: '',
          password: '',
          confirmPassword: '',
          condominium: '',
          activeTab: 1
        }, () => this.props.history.replace(process.env.mainRoute))
      }
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
    } else if (type === 'forget') {
      this.props.forgotPasswordAction({
        user_name: this.state.userName,
        email: this.state.email
      })
    } else if (type === 'reset') {
      this.props.resetPasswordAction({
        data: {
          password: this.state.password
        },
        id: this.state.id
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
    const title = 'Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters'
    if (this.state.activeTab === 1) {
      return (
        <form onSubmit={e => this.onSubmitForm(e, 'signin')} >
          <input onChange={e => this.onChange(e.target.value, 'userName')} value={this.state.userName} type='text' className='form-control first' placeholder='User Name' required />
          <input onChange={e => this.onChange(e.target.value, 'password')} value={this.state.password} type='password' className='form-control last' placeholder='Password' required />
          <button className='btn btn-lg btn-primary btn-block' type='submit'>Sign in</button>
        </form>
      )
    }
    if (this.state.activeTab === 3) {
      return (
        <form onSubmit={e => this.onSubmitForm(e, 'forget')} >
          <input onChange={e => this.onChange(e.target.value, 'email')} value={this.state.email} type='email' className='form-control first' placeholder='Email' required />
          <input onChange={e => this.onChange(e.target.value, 'userName')} value={this.state.userName} type='text' className='form-control last' placeholder='User Name' required />
          <button className='btn btn-lg btn-primary btn-block' type='submit'>Submit</button>
        </form>
      )
    }
    const disabled = this.state.password !== this.state.confirmPassword || this.state.condominium === ''
    return (
      <form onSubmit={e => this.onSubmitForm(e, 'signup')} >
        <input onChange={e => this.onChange(e.target.value, 'email')} value={this.state.email} type='email'className='form-control first' placeholder='Email address' required />
        <input onChange={e => this.onChange(e.target.value, 'userName')} value={this.state.userName} type='text' className='form-control middle' placeholder='User Name' required />
        <Dropdown title='Select Condominium' options={Condominium} active={this.state.condominium} onChange={value => this.onChange(value, 'condominium')} />
        <input pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}' title={title} onChange={e => this.onChange(e.target.value, 'password')} value={this.state.password} type='password' className='form-control middle' placeholder='Password' required />
        <input onChange={e => this.onChange(e.target.value, 'confirmPassword')} value={this.state.confirmPassword} type='password' className='form-control last' placeholder='Confirm Password' required />
        <button className={disabled ? 'btn btn-lg btn-primary btn-block disabled' : 'btn btn-lg btn-primary btn-block'} type='submit'>Sign up</button>
      </form>
    )
  }
  renderReset () {
    const disabled = this.state.password !== this.state.confirmPassword
    const title = 'Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters'
    return (
      <form onSubmit={e => this.onSubmitForm(e, 'reset')} >
        <h1 className='h3 mb-3 font-weight-normal'>Reset password</h1>
        <input pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}' title={title} onChange={e => this.onChange(e.target.value, 'password')} value={this.state.password} type='password' className='form-control first' placeholder='Password' required />
        <input onChange={e => this.onChange(e.target.value, 'confirmPassword')} value={this.state.confirmPassword} type='password' className='form-control last' placeholder='Confirm Password' required />
        <button className={disabled ? 'btn btn-lg btn-primary btn-block disabled' : 'btn btn-lg btn-primary btn-block'} type='submit'>Reset Password</button>
      </form>
    )
  }
  renderTabs () {
    return (
      <ul className='nav nav-tabs'>
        <li className='nav-item'>
          <a role='presentation' onClick={() => this.toggle(1)} className={this.state.activeTab === 1 ? 'nav-link active' : 'nav-link'}>Log In</a>
        </li>
        <li className='nav-item'>
          <a role='presentation' onClick={() => this.toggle(2)} className={this.state.activeTab === 2 ? 'nav-link active' : 'nav-link'}>Sign Up</a>
        </li>
        <li className='nav-item'>
          <a role='presentation' onClick={() => this.toggle(3)} className={this.state.activeTab === 3 ? 'nav-link active' : 'nav-link'}>Forgot Password</a>
        </li>
      </ul>
    )
  }
  render () {
    return (
      <Loader loading={this.props.check.loading} error={this.props.check.error} >
        <div className='login-page' >
          <div className='login-container form-signin text-center' >
            {this.state.id ? this.renderReset() : this.renderTabs()}
            {this.state.id ? null : this.renderContent()}
          </div>
        </div>
      </Loader>
    )
  }
}

const mapStateToProps = state => ({
  login: state.login,
  status: state.status,
  check: state.checkReset
})

export default connect(mapStateToProps, {
  loginAction, signupAction, forgotPasswordAction, checkResetAction, resetPasswordAction
})(Login)
