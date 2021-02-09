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
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className="username-container">
        <input
          type="text"
          placeholder="CptnAmerica"
          required
          value={username}
          onChange={(e) => {
            handleState(e.target.value, setUsername);
          }}
        ></input>
      </div>
      <div className="email-container">
        <input
          type="email"
          placeholder="captn@america.com"
          required
          value={email}
          onChange={(e) => {
            handleState(e.target.value, setEmail);
          }}
        ></input>
      </div>
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
