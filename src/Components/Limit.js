const Limit = (props) => {
  const { setLimit, handleState } = props;
  const limits = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <div className="skip-container">
      <label htmlFor="limit">
        Number of characters
        <select
          name="limit"
          id="limit"
          onChange={(e) => {
            handleState(e.target.value, setLimit);
          }}
          defaultValue={50}
        >
          {limits.map((limit, index) => {
            return (
              <option key={index} value={limit}>
                {limit}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};
export default Limit;
