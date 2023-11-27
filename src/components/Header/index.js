import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logout = () => {
    const {history} = props
    history.replace('/ebank/login')
    Cookies.remove('jwt_token')
  }
  return (
    <nav className="header-cont">
      <Link to="/">
        <img
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
      </Link>
      <button type="button" className="logout-btn" onClick={logout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
