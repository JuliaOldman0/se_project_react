import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  onLogin,
  onRegister,
  onLogout,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData?.city || "Loading..."}
      </p>

      <ToggleSwitch />

      {isLoggedIn ? (
        <div className="header__auth-buttons">
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>

          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__user-name">Terrence Tegegne</p>
              <img
                className="header__user-avatar"
                src={avatar}
                alt="User avatar"
              />
            </div>
          </Link>

          <button
            type="button"
            onClick={onLogout}
            className="header__auth-button"
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="header__auth-buttons">
          <button
            type="button"
            onClick={onRegister}
            className="header__auth-button"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={onLogin}
            className="header__auth-button"
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
