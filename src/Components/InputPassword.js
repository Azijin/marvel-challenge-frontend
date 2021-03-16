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
    <label className="password-container" htmlFor="password">
      Password
      <input
        id="password"
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="StR0ng-Pa55w0rD-L1k3-HulK"
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
    </label>
  );
};
export default InputPassword;
