import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  onLogin,
  onRegister,
  onLogout,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const userName = currentUser?.name || "User";
  const userAvatar = currentUser?.avatar;
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData?.city || "Loading..."}
      </p>

      <ToggleSwitch />

      {isLoggedIn ?
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
              <p className="header__user-name">{userName}</p>

              {userAvatar ?
                <img
                  className="header__user-avatar"
                  src={userAvatar}
                  alt={userName}
                />
              : <div className="header__user-avatar-placeholder">
                  {userInitial}
                </div>
              }
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
      : <div className="header__auth-buttons">
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
      }
    </header>
  );
}

export default Header;
