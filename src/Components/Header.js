import marvelLog from "../assets/img/marvel-logo.svg";
import { useHistory, Link } from "react-router-dom";

const Header = (props) => {
  const { account } = props;
  const history = useHistory();
  return (
    <header>
      <div></div>
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
