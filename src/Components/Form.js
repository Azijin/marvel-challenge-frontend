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
  } = props;
  const isInputEmail =
    email !== undefined && setEmail !== undefined ? true : false;
  console.log(isInputEmail);
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
          value={username}
          onChange={(e) => {
            handleState(e.target.value, setUsername);
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
              handleState(e.target.value, setEmail);
            }}
          ></input>
        </label>
      )}

      <InputPassword
        value={password}
        setPassword={setPassword}
        handleState={handleState}
      />
      <button type="submit">{type}</button>
    </form>
  );
};
export default Form;
