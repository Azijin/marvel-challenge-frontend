import navLogo from "../assets/img/nav-logos-insider.png";
import marvelLog from "../assets/img/marvel-logo.svg";
import { useHistory, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = (props) => {
  const history = useHistory();
  return (
    <header>
      <div></div>
      <div className="options forms">
        <div>
          <button
            onClick={() => {
              history.push("/join");
            }}
          >
            sign in
          </button>
          <span>|</span>
          <button>join</button>
        </div>
      </div>
      <div className="logo-container">
        <Link to="/">
          <img src={marvelLog} alt="marvel logo" className="marvel-logo" />
        </Link>
      </div>
      <div className="options">
        <div>
          <button
            onClick={() => {
              history.push("/characters");
            }}
          >
            characters
          </button>
          <span>|</span>
          <button
            onClick={() => {
              history.push("/comics");
            }}
          >
            comics
          </button>
        </div>
      </div>
      <div></div>
    </header>
  );
};
export default Header;
