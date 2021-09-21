import ReactPaginate from "react-paginate";

const Paging = (props) => {
  const { numberOfPages, handleSkip, limit, setSkip } = props;
  return (
    <div className="pagination-container">
      <div className="pagination">
        <ReactPaginate
          pageCount={numberOfPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={9}
          breakLabel={"..."}
          previousLabel={"previous"}
          nextLabel={numberOfPages > 0 && "next"}
          containerClassName=""
          activeLinkClassName="actual-page"
          disabledClassName="disabled-pagination"
          onPageChange={(e) => {
            handleSkip(e.selected, limit, setSkip);
          }}
        />
      </div>
    </div>
  );
};
export default Paging;
