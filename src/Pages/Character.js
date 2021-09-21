import { useState, useEffect } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import axios from "axios";

import Loading from "../Components/Loading";
import Card from "../Components/Card";

const Character = (props) => {
  const { favorites, isInFavorites, addFavorite, removeFavorite } = props;

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isError, setIsError] = useState(false);

  const history = useHistory();

  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://marvel-challeng.herokuapp.com/comics/${id}`
      );
      if (response.status === 200) {
        setData(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  const character = data.data ? data.data : {};

  const btnContent = isFavorite ? "Remove favorite" : "Add favorite";

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    isInFavorites(id, "characters", setIsFavorite);
  }, [favorites]);

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Redirect to="/error" />
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
                if (!favorites) {
                  history.push("/signin");
                } else {
                  isFavorite
                    ? removeFavorite(id, "characters")
                    : addFavorite(
                        {
                          id: id,
                          name: character.name,
                          thumbnail: {
                            path: character.thumbnail.path,
                            extension: character.thumbnail.extension,
                          },
                        },
                        "characters"
                      );
                }
              }}
            >
              {btnContent}
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
                    pageContent="comics"
                    title={comic.title}
                    picture={comic.thumbnail.path}
                    extension={comic.thumbnail.extension}
                    id={comic._id}
                    favorites={favorites}
                    isInFavorites={isInFavorites}
                    addFavorite={addFavorite}
                    removeFavorite={removeFavorite}
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
