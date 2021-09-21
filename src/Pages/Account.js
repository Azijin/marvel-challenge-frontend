/*
Account page
*/

import { Redirect } from "react-router-dom";
const Account = (props) => {
  const { account, handleLogout } = props;

  return account ? (
    <div className="user-account">
      <div className="account-container">
        <section className="account-infos">
          <div className="infos">
            <p>
              <span>Username</span> : {account.username}
            </p>
          </div>
          <div className="infos">
            <p>
              <span>Email adress</span> : {account.email}
            </p>
          </div>
          <div className="log-out">
            <button
              onClick={() => {
                handleLogout();
              }}
            >
              Log out
            </button>
          </div>
        </section>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};
export default Account;
