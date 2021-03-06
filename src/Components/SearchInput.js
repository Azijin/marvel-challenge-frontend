import Limit from "./Limit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchInput = (props) => {
  const {
    userSearch,
    setUserSearch,
    setLimit,
    handleState,
    results,
    notFound,
  } = props;
  return (
    <div className="search-container">
      <div className="input-container">
        <FontAwesomeIcon className="search-icon" icon="search" />
        <input
          type="text"
          placeholder="SEARCH"
          value={userSearch}
          onChange={(e) => {
            handleState(e.target.value, setUserSearch);
          }}
        />
      </div>
      <div className="results">
        <span>{results} results</span>{" "}
        {notFound && <span className="not-found">no matches found</span>}
      </div>
      <Limit handleState={handleState} setLimit={setLimit} />
    </div>
  );
};
export default SearchInput;
