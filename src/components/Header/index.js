import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import logo from "../../logo.png";
import "./styles.css";

const Header = props => {
  const onLogOut = event => {
    props.logOut();
    props.history.push("/");
  };
  const renderNav = () => {
    if (props.user._id) {
      return (
        <>
          <li onClick={() => props.history.push("/profile/" + props.user._id)}>{props.user.username}</li>
          <li onClick={onLogOut}>Déconnexion</li>
        </>
      );
    }
    return (
      <>
        <li onClick={() => props.history.push("Signup2")}>Créer un compte</li>
        <li onClick={() => props.history.push("SignIn")}>Se connecter</li>
      </>
    );
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="menu">
          <div className="menu-left">
            <ul>
              <li>
                <NavLink to="/publish">DÉPOSER UNE ANNONCE</NavLink>
              </li>
              <li>
                <NavLink to="/">OFFRES</NavLink>
              </li>
            </ul>
          </div>
          <div className="menu-right">
            <ul>{renderNav()}</ul>
          </div>
        </div>
      </div>
    </header>
  );
};

// https://stackoverflow.com/a/53539315/704387
// withRouter gives the Header component access to this.props.history, which means the header can now redirect the user.
export default withRouter(Header);
