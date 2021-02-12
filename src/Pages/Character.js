import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Loading from "../Components/Loading";
import Card from "../Components/Card";

const Character = (props) => {
  const { addFavorites } = props;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://marvel-challeng.herokuapp.com/comics/${id}`
      );
      console.log(response);
      if (response.status === 200) {
        setData(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const character = data.data ? data.data : {};
  return isLoading ? (
    <Loading />
  ) : (
    <div className="results-page">
      <div className="results-container">
        <div className="results-avatar">
          <div>
            <img
              src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
              alt={character.name}
            />
            <button
              onClick={() => {
                addFavorites(id, "characters");
              }}
            >
              Add to favorite
            </button>
          </div>
        </div>
        <section className="results-infos">
          <div className="results-name">
            <h2>{character.name}</h2>
          </div>
          <div className="results-description">
            <p>{character.description}</p>
          </div>
          <section className="results-related">
            <div>
              <h3>related comics</h3>
            </div>
            <div>
              {character.comics.map((comic, index) => {
                return (
                  <Card
                    key={index}
                    title={comic.title}
                    picture={comic.thumbnail.path}
                    extension={comic.thumbnail.extension}
                    id={comic._id}
                    pageContent="comic"
                  />
                );
              })}
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};
export default Character;
