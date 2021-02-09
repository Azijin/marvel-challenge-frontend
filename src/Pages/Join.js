import { useState } from "react";
import axios from "axios";

import Form from "../Components/Form";

const Signin = (props) => {
  const { handleState, handleLogin } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorInput, setErrorInput] = useState({ error: false });
  const [hasJoined, sethasJoined] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (username.length <= 3) {
        setErrorInput({
          error: true,
          message: "your username must be at least 4 charaters",
        });
        return;
      }
      if (password.length < 5) {
        setErrorInput({
          error: true,
          message: "your password must be at least 8 charaters",
        });
        return;
      }
      let regex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      );
      if (!regex.test(password)) {
        console.log(password);
        console.log(regex.test(password));
        setErrorInput({
          error: true,
          message:
            "your password must contain a number, an uppercase letter, a lowercase letter and a special character",
        });
        return;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/signup`,
        {
          username: username,
          email: email,
          password: password,
        }
      );
      console.log(response);
      if (response.status === 200) {
        handleLogin(response.data.token);
        sethasJoined(true);
        console.log("signup");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status) {
        if (error.response.status === 409) {
          setErrorInput({
            error: true,
            message: error.response.data.message,
          });
        }
      }
    }
  };
  return (
    <div className="join form-container">
      <h2>Join</h2>
      {hasJoined ? (
        <h3>Thanks for joining {username}</h3>
      ) : (
        <>
          {" "}
          <Form
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleState={handleState}
            handleSubmit={handleSubmit}
            btnText={"join"}
          />
          <div className="error-alerts">
            {errorInput.error && (
              <span className="error">{errorInput.message}</span>
            )}
          </div>{" "}
        </>
      )}
    </div>
  );
};
export default Signin;
