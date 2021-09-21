import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import "../src/assets/css/reset.css";
import "../src/assets/css/App.css";

import Page404 from "./Pages/Page404";
import PageError from "./Pages/PageError";
import Header from "./Components/Header";
import Join from "./Pages/Join";
import Signin from "./Pages/Signin";
import Home from "./Components/Home";
import Account from "./Pages/Account";
import Favorites from "./Pages/Favorites";
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
  faHeart,
  faSortUp,
  faSortDown,
  faPlus,
  faTrash,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faSearch,
  faEye,
  faEyeSlash,
  faHeart,
  faSortDown,
  faSortUp,
  faPlus,
  faTrash,
  faSignOutAlt
);

function App() {
  const [authToken, setAuthToken] = useState(Cookies.get("auth_token") || null);
  const [account, setAccount] = useState(null);
  const [favorites, setFavorites] = useState(null);

  const handleUpdateAccount = async (dataToUpdate) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/setting/profil`,
        dataToUpdate,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      if (response.status === 200) {
        setAccount(response.data.newProfil);
      }
    } catch (error) {}
  };

  const addFavorite = (favorite, type) => {
    const newFavorites = { ...favorites };
    if (newFavorites[type].indexOf(favorite) === -1) {
      newFavorites[type].push(favorite);
      handleUpdateAccount({ favorites: newFavorites });
    }
  };

  const removeFavorite = (id, type) => {
    const newFavorites = { ...favorites };
    newFavorites[type] = newFavorites[type].filter(
      (favorite) => favorite.id !== id
    );
    handleUpdateAccount({ favorites: newFavorites });
  };

  const isInFavorites = (favoriteId, type, setFavorite) => {
    let isFavorite = false;
    if (favorites) {
      favorites[type].forEach((favorite) => {
        if (favorite.id === favoriteId) {
          isFavorite = true;
        }
      });
    }
    setFavorite(isFavorite);
  };

  const handleSkip = (range, limit, callback) => {
    callback(range * limit);
  };

  const handleState = (newState, setState) => {
    setState(newState);
  };

  const handleLogin = (token) => {
    Cookies.set("auth_token", token, { expires: 1 });
    setAuthToken(token);
  };

  const handleLogout = () => {
    Cookies.remove("auth_token");
    setAuthToken(null);
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
    } else {
      setAccount(null);
    }
  }, [authToken]);

  useEffect(() => {
    if (account) {
      setFavorites(account.favorites);
    }
  }, [account]);

  return (
    <Router>
      <Header account={account} handleLogout={handleLogout} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/join">
          <Join account={account} handleState={handleState} />
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
            handleLogout={handleLogout}
          />
        </Route>
        <Route path="/favorites">
          <Favorites
            authToken={authToken}
            favorites={favorites}
            isInFavorites={isInFavorites}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        </Route>
        <Route path="/comic/:id">
          <Comic
            favorites={favorites}
            isInFavorites={isInFavorites}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        </Route>
        <Route path="/character/:id">
          <Character
            favorites={favorites}
            isInFavorites={isInFavorites}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        </Route>
        <Route path="/comics">
          <Comics
            handleSkip={handleSkip}
            handleState={handleState}
            favorites={favorites}
            isInFavorites={isInFavorites}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        </Route>
        <Route path="/characters">
          <Characters
            handleSkip={handleSkip}
            handleState={handleState}
            favorites={favorites}
            isInFavorites={isInFavorites}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        </Route>
        <Route path="/error">
          <PageError />
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
