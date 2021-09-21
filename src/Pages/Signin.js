import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

import Form from "../Components/Form";

const Signin = (props) => {
  const { account, handleState, handleLogin } = props;
  const [accountId, setAccountId] = useState("user1");
  const [password, setPassword] = useState("StR0ng-Pa55w0rD-L1k3-HulK");
  const [isClickable, setIsClickable] = useState(true);

  const [errorLogin, setErrorLogin] = useState({ error: false });

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsClickable(false);
      setErrorLogin({ error: false });
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          accountId: "user1",
          password: `AFKGhYd!3#@doNqL`,
        }
      );
      if (response.status === 200) {
        handleLogin(response.data.token);
      }
    } catch (error) {
      if (error) {
        setIsClickable(true);
        if (error.response.status === 400) {
          setErrorLogin({
            error: true,
            message: error.response.data.message,
          });
        }
      }
    }
  };

  return account ? (
    <Redirect to="/" />
  ) : (
    <div className="join form-container">
      <h2>Sign in</h2>
      <p>
        <em>
          This is a demo application, just click to sign in to try the app
        </em>
      </p>
      <Form
        username={accountId}
        setUsername={setAccountId}
        password={password}
        setPassword={setPassword}
        handleState={handleState}
        handleSubmit={handleSubmit}
        type={"sign in"}
        isClickable={isClickable}
      />
      <div className="error-alerts">
        {errorLogin.error && (
          <span className="error">{errorLogin.message}</span>
        )}
      </div>
      <div>
        <Link to="/join">You don't have an account ? Join us !</Link>
      </div>
    </div>
  );
};
export default Signin;
