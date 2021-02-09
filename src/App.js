import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";

import "../src/assets/css/reset.css";
import "../src/assets/css/App.css";

import Page404 from "./Components/Page404";
import Header from "./Components/Header";
import Join from "./Pages/Join";
import Home from "./Components/Home";
import Comics from "./Pages/Comics/Comics";
import Comic from "./Pages/Comic";
import Characters from "./Pages/Characters/Characters";
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
  const [favorites, setFavorites] = useState([]);
  const [localStorage, setLocalStorage] = useState();

  const handleFavorites = (id) => {
    const newFavorites = [...favorites];
    favorites.push(id);
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

  console.log(favorites);
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/join">
          <Join handleState={handleState} handleLogin={handleLogin} />
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
