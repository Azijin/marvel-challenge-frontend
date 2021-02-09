const Paging = (props) => {
  const { results, pages, handleSkip, limit, setSkip, notFound } = props;
  return (
    <div className="paging-container">
      <div className="paging-total">
        <span>{results} results</span>{" "}
        {notFound && (
          <span className="not-found">
            no matches found ! please try an other search
          </span>
        )}
      </div>
      <div className="pages">
        <span>pages</span>
        {pages.map((page, index) => {
          return (
            <span
              value={page}
              key={index}
              onClick={(e) => {
                handleSkip(e.target.textContent, limit, setSkip);
              }}
            >
              {page}
            </span>
          );
        })}
      </div>
    </div>
  );
};
export default Paging;
