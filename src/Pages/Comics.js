import { useState, useEffect } from "react";

import axios from "axios";
import { useDebounce } from "use-debounce";
import qs from "qs";

import Loading from "../Components/Loading";
import Card from "../Components/Card";
import SearchInput from "../Components/SearchInput";
import Paging from "../Components/Paging";

const Comics = (props) => {
  const { handleSkip, handleState } = props;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userSearch, setUserSearch] = useState("");
  const [debouncedUserSearch] = useDebounce(userSearch, 1000);
  const [limit, setLimit] = useState(50);
  const [skip, setSkip] = useState(0);
  const [results, setResult] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [notFound, setNotFound] = useState(false);

  const fetchData = async () => {
    try {
      const params = {
        title: debouncedUserSearch,
        limit: limit,
        skip: skip,
      };
      const queryParams = qs.stringify(params);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/comics?${queryParams}`
      );
      if (response.status === 200) {
        setData(response.data);
        setResult(response.data.count);
        setNotFound(false);
        setIsLoading(false);
        console.log(response);
      }
    } catch (error) {
      if (error.response.status === 404) {
        setNotFound(true);
        setResult(0);
        setData({});
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [debouncedUserSearch, limit, skip]);

  useEffect(() => {
    setNumberOfPages(Math.ceil(results / limit));
  }, [results, limit]);

  const comics = data.results ? data.results : [];

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="search-pagin-container">
        <SearchInput
          userSearch={userSearch}
          setUserSearch={setUserSearch}
          handleState={handleState}
          setLimit={setLimit}
          results={results}
          notFound={notFound}
        />
        <Paging
          limit={limit}
          handleSkip={handleSkip}
          setSkip={setSkip}
          numberOfPages={numberOfPages}
        />
      </div>

      <div className="cards-container">
        {comics.map((comic, index) => {
          return (
            <Card
              key={index}
              title={comic.title}
              picture={comic.thumbnail.path}
              extension={comic.thumbnail.extension}
              id={comic._id}
              description={comic.description}
              pageContent="comic"
            />
          );
        })}
      </div>
    </>
  );
};
export default Comics;
