import { Redirect } from "react-router-dom";
const Account = (props) => {
  const { account } = props;

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
          <div className="infos">
            <p>
              <span>Phone</span> : {account.phone}
            </p>
          </div>
          <div className="infos">
            <p>
              <span>Adress</span> : {account.adress}
            </p>
          </div>
          <div className="infos">
            <p>
              <span>City</span> : {account.city}
            </p>
            <div className="infos">
              <p>
                <span>Country</span> : {account.country}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};
export default Account;
