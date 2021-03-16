import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

import Form from "../Components/Form";

const Signin = (props) => {
  const { account, handleState, handleLogin } = props;
  const [accountId, setAccountId] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState({ error: false });

  const handleSubmit = async (event) => {
    try {
      setErrorLogin({ error: false });
      event.preventDefault();
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          accountId: accountId,
          password: password,
        }
      );
      if (response.status === 200) {
        handleLogin(response.data.token);
      }
    } catch (error) {
      if (error) {
        if (error.status) {
          if (error.response.status === 400) {
            setErrorLogin({
              error: true,
              message: error.response.data.message,
            });
          }
        }
      }
    }
  };

  return account ? (
    <Redirect to="/" />
  ) : (
    <div className="join form-container">
      <h2>Sign in</h2>
      <Form
        accountId={accountId}
        setUsername={setAccountId}
        password={password}
        setPassword={setPassword}
        handleState={handleState}
        handleSubmit={handleSubmit}
        type={"sign in"}
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
