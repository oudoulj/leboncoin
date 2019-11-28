import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Cookies from "js-cookie";
import logo from "./logo.png";
import Header from "./components/Header";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Signup2 from "./containers/Signup2";
import SignIn from "./containers/SignIn";

function App() {
  const [user, setUser] = useState({
    token: Cookies.get("token") || "",
    username: Cookies.get("username") || "",
    _id: Cookies.get("_id") || ""
  });

  const logIn = user => {
    //we set both the cookie AND the state to keep them synchronized
    Cookies.set("token", user.token);
    Cookies.set("username", user.username);
    Cookies.set("_id", user._id);

    setUser(user);
  };

  //the opposite of logIn
  const logOut = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("_id");

    setUser({
      user: {
        token: "",
        username: "",
        _id: ""
      }
    });
  };

  return (
    <>
      <Router>
        <Header user={user} logOut={logOut}></Header>
        {/* <nav>
          <Link to="/" className="menuLink">
            <img src={logo} alt="" />
          </Link>
          <Link to="/create" className="menuLink">
            Déposer une annonce
          </Link>
          <Link to="/" className="menuLink">
            Offres
          </Link>
          <Link to="/Signup" className="menuLink">
            S'inscrire
          </Link>
          <Link to="/SignIn">Se connecter</Link>
        </nav> */}
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/offer/:id" component={Offer} />
          <Route path="/signup" render={props => <Signup2 {...props} user={user} logIn={logIn} />} />
          {/*<Route path="/about" component={AboutPage} /> */}
          <Route path="/signin" render={props => <SignIn {...props} logIn={logIn} />} />
        </div>
      </Router>
    </>
  );
}

export default App;
