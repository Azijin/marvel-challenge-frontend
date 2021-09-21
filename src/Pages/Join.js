import { useState } from "react";
import { Redirect, Link } from "react-router-dom";

import Form from "../Components/Form";
import Modal from "../Components/Modal";

const Signin = (props) => {
  const { account, handleState } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorInput, setErrorInput] = useState({ error: false });
  const [isClickable, setIsClickable] = useState(true);
  const [isModalDisplay, setIsModalDisplay] = useState(false);

  const handleModalDisplay = () => {
    setIsModalDisplay(!isModalDisplay);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setErrorInput({ error: false });
      setIsClickable(false);
      if (username.length <= 3) {
        setErrorInput({
          error: true,
          message: "your username must be at least 4 charaters",
        });
        setIsClickable(true);
        return;
      }
      if (password.length < 5) {
        setErrorInput({
          error: true,
          message: "your password must be at least 8 charaters",
        });
        setIsClickable(true);
        return;
      }
      let regex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_])(?=.{8,})"
      );
      if (!regex.test(password)) {
        setErrorInput({
          error: true,
          message:
            "your password must contain a number, an uppercase letter, a lowercase letter and a special character",
        });
        setIsClickable(true);
        return;
      }
      handleModalDisplay();
    } catch (error) {
      setIsClickable(true);
      if (error) {
        if (error.status) {
          if (error.response.status === 409) {
            setErrorInput({
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
      <Modal
        isModalDisplay={isModalDisplay}
        handleModalDisplay={handleModalDisplay}
        username={username}
      />
      <h2>Join</h2>
      <Form
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleState={handleState}
        handleSubmit={handleSubmit}
        type={"join"}
        isClickable={isClickable}
      />
      <div className="error-alerts">
        {errorInput.error && (
          <span className="error">{errorInput.message}</span>
        )}
      </div>
      <div>
        <Link to="/signin">Already have an account ? Sign in !</Link>
      </div>
    </div>
  );
};
export default Signin;
