import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {userId: '', pin: '', failureText: ''}

  onTypeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onTypePin = event => {
    this.setState({pin: event.target.value})
  }

  onLogin = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    console.log(userDetails)
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      const data = await response.json()
      this.setState({failureText: data.error_msg})
    }
  }

  render() {
    const {failureText, userId, pin} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-cont">
        <div className="login-cont">
          <img
            className="website-img"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <div className="form-cont">
            <form className="form" onSubmit={this.onLogin}>
              <h1 className="login-head">Welcome Back!</h1>
              <label htmlFor="userId" className="label">
                User ID
              </label>
              <input
                id="userId"
                className="input"
                type="text"
                onChange={this.onTypeUserId}
                placeholder="Enter User ID"
                value={userId}
              />
              <label className="label" htmlFor="pin">
                PIN
              </label>
              <input
                value={pin}
                placeholder="Enter PIN"
                type="password"
                className="input"
                onChange={this.onTypePin}
                id="pin"
              />
              <button type="submit" className="login-btn">
                Login
              </button>
              {failureText === '' ? null : (
                <p className="error-msg">{failureText}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
