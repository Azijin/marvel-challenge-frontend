import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputPassword = (props) => {
  const { value, setPassword, handleState, displayTips } = props;
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  return (
    <div className="password-container">
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        required
        value={value}
        onChange={(e) => {
          handleState(e.target.value, setPassword);
        }}
        onClick={displayTips}
      />
      <FontAwesomeIcon
        className="display-password"
        prefix="far"
        icon={showPassword ? "eye-slash" : "eye"}
        onClick={handleShowPassword}
      />
    </div>
  );
};
export default InputPassword;
