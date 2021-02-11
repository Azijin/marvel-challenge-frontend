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
    btnText,
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
      <div className="username-container">
        <input
          type="text"
          placeholder={
            btnText === "join" ? "Username" : "Username or email adress"
          }
          required
          value={username}
          onChange={(e) => {
            handleState(e.target.value, setUsername);
          }}
        ></input>
      </div>
      {isInputEmail && (
        <div className="email-container">
          <input
            type="email"
            placeholder="my-adress@email.com"
            required
            value={email}
            onChange={(e) => {
              handleState(e.target.value, setEmail);
            }}
          ></input>
        </div>
      )}

      <InputPassword
        value={password}
        setPassword={setPassword}
        handleState={handleState}
      />
      <button type="submit">{btnText}</button>
    </form>
  );
};
export default Form;
