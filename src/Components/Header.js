import marvelLogo from "../assets/img/marvel-logo.svg";
import { useHistory, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = (props) => {
  const { account, handleLogout } = props;
  const history = useHistory();
  return (
    <header>
      <div
        onClick={() => {
          account && handleLogout();
        }}
      >
        {account && (
          <FontAwesomeIcon icon="sign-out-alt" onClick={handleLogout} />
        )}
      </div>
      <div className="options forms">
        <div>
          {account ? (
            <button
              onClick={() => {
                history.push("/account");
              }}
            >
              account
            </button>
          ) : (
            <button
              onClick={() => {
                history.push("/join");
              }}
            >
              join
            </button>
          )}

          <span>|</span>
          {account ? (
            <button
              onClick={() => {
                history.push("/favorites");
              }}
            >
              favorites
            </button>
          ) : (
            <button
              onClick={() => {
                history.push("/signin");
              }}
            >
              signin
            </button>
          )}
        </div>
      </div>
      <div className="logo-container">
        <Link to="/">
          <img src={marvelLogo} alt="marvel logo" className="marvel-logo" />
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
