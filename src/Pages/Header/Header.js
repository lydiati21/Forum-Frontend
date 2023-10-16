import { useEffect } from "react";
import { useUserContext } from "../../Context/UserContext";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [userData, setUserData] = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user]);



    const logout = () => {
      //set global state to undefined will logout the user
      setUserData({
        token: undefined,
        user: undefined,
      });

      //resetting localStorage
      localStorage.setItem("auth-token", "");
    };
  return (
    <div className="header">
      <div className="header__container">
        <Link to="/" className="header__image">
          <img
            src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
            alt="Evangadi logo"
            className="header__logo"
          />
        </Link>
      </div>

      <div className="header__link">
        <Link to="" className="header__link--text clear_link">
          Home
        </Link>
        <Link to="" className="header__link--text clear_link">
          How it Works
        </Link>
        {userData.user && userData.user !== "signup" ? (
          <Link className="header__link--text clear_link" onClick={logout}>
            Log out
          </Link>
        ) : (
          <button
            className="header__link--btn"
            onClick={() => {
              navigate("/signup");
            }}
          >
            SIGN IN
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
