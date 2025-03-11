import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({handleAddClick}) {
  return <header className="header">
    <img className="header__logo" src={logo} alt="Logo" />
    <p className="header__date-and-location">Date, Location</p>
    <button onClick={handleAddClick} type="button" className="header__add-clothes-btn">+ Add clothes</button>
    <div className="header__user-container">
      <p className="header__user-name">Terrence Tegegne</p>
      <img className="header__user-avatar" src={avatar} alt="Terrence Tegegne" />
    </div>
  </header>;
}

export default Header;
