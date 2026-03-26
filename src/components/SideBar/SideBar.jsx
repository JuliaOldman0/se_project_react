import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const userName = currentUser?.name || "User";
  const userAvatar = currentUser?.avatar;
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        {userAvatar ?
          <img className="sidebar__avatar" src={userAvatar} alt={userName} />
        : <div className="sidebar__avatar-placeholder">{userInitial}</div>}

        <p className="sidebar__username">{userName}</p>
      </div>

      <button type="button" className="sidebar__button" onClick={onEditProfile}>
        Edit profile
      </button>

      <button type="button" className="sidebar__button" onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
