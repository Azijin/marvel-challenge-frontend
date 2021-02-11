import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import "../src/assets/css/reset.css";
import "../src/assets/css/App.css";

import Page404 from "./Components/Page404";
import Header from "./Components/Header";
import Join from "./Pages/Join";
import Signin from "./Pages/Signin";
import Home from "./Components/Home";
import Account from "./Pages/Account";
import Comics from "./Pages/Comics";
import Comic from "./Pages/Comic";
import Characters from "./Pages/Characters";
import Character from "./Pages/Character";
import Footer from "./Components/Footer";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faEye,
  faEyeSlash,
  faUserCircle,
  faBell,
  faHeart,
  faEnvelope,
  faSortUp,
  faSortDown,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faSearch,
  faEye,
  faEyeSlash,
  faUserCircle,
  faBell,
  faHeart,
  faEnvelope,
  faSortDown,
  faSortUp,
  faPlus,
  faTrash
);

function App() {
  const [authToken, setAuthToken] = useState(Cookies.get("auth_token") || null);
  const [account, setAccount] = useState(null);
  const [favorites, setFavorites] = useState(null);

  const handleFavorites = (id, type) => {
    const newFavorites = { ...favorites };
    favorites[type].push(id);
    setFavorites(newFavorites);
  };

  const handleSkip = (range, limit, callback) => {
    callback((Number(range) - 1) * limit);
  };

  const handlePages = (numOfPages, setNumOfPages) => {
    let newPages = [];
    for (let i = 1; i <= numOfPages; i++) {
      newPages.push(i);
    }
    setNumOfPages(newPages);
  };

  const handleState = (newState, setState) => {
    setState(newState);
  };

  const handleLogin = (token) => {
    Cookies.set("auth_token", token, { expires: 1 });
    setAuthToken(token);
  };

  const getUserAccount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/get-user`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      if (response.status === 200) {
        setAccount(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (authToken) {
      getUserAccount();
    }
  }, [authToken]);

  return (
    <Router>
      <Header account={account} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/join">
          <Join
            account={account}
            handleState={handleState}
            handleLogin={handleLogin}
          />
        </Route>
        <Route path="/signin">
          <Signin
            account={account}
            handleState={handleState}
            handleLogin={handleLogin}
          />
        </Route>
        <Route path="/account">
          <Account
            account={account}
            authToken={authToken}
            handleState={handleState}
            getUserAccount={getUserAccount}
          />
        </Route>
        <Route path="/comic/:id">
          <Comic />
        </Route>
        <Route path="/character/:id">
          <Character handleFavorites={handleFavorites} />
        </Route>
        <Route path="/comics">
          <Comics
            handleSkip={handleSkip}
            handlePages={handlePages}
            handleState={handleState}
          />
        </Route>
        <Route path="/characters">
          <Characters
            handleSkip={handleSkip}
            handlePages={handlePages}
            handleState={handleState}
          />
        </Route>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
