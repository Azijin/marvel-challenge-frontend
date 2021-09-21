import InputPassword from "./InputPassword";

const Form = (props) => {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    handleState,
    type,
    isClickable,
  } = props;

  const isInputEmail =
    email !== undefined && setEmail !== undefined ? true : false;
  const isDisabled = type == "join" ? "" : "disabled";
  const btnClass = isClickable ? "" : "btn-not-clickable";

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <label className="username-container" htmlFor="username">
        {type === "join" ? "Username" : "Account"}
        <input
          id="username"
          type="text"
          placeholder={type === "join" ? "Vision" : "Username or email adress"}
          required
          disabled={isDisabled}
          value={username}
          onChange={(e) => {
            type == "join" && handleState(e.target.value, setUsername);
          }}
        ></input>
      </label>
      {isInputEmail && (
        <label className="email-container" htmlFor="email">
          Email adress
          <input
            id="email"
            type="email"
            placeholder="iam@groot.com"
            required
            value={email}
            onChange={(e) => {
              type == "join" && handleState(e.target.value, setEmail);
            }}
          ></input>
        </label>
      )}

      <InputPassword
        value={password}
        setPassword={setPassword}
        handleState={handleState}
        isDisabled={isDisabled}
        type={type}
      />
      <button type="submit" disabled={!isClickable} className={btnClass}>
        {type}
      </button>
    </form>
  );
};
export default Form;
