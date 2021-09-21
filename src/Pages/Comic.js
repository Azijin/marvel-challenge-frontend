import { useState, useEffect } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";

const Comic = (props) => {
  const { favorites, isInFavorites, addFavorite, removeFavorite } = props;
  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useParams();

  const history = useHistory();

  const location = useLocation();
  const comic = location.state;

  let comicDescription = comic.description ? comic.description : false;

  if (comicDescription) {
    if (comic.description.indexOf("<br>") !== -1) {
      comicDescription = comicDescription.replace(/<br>/g, "");
    }
  }

  const favoriteData = {
    id: id,
    title: comic.title,
    thumbnail: {
      path: comic.picture,
      extension: comic.extension,
    },
  };

  const btnContent = isFavorite ? "Remove favorite" : "Add favorite";

  useEffect(() => {
    isInFavorites(id, "comics", setIsFavorite);
  }, [favorites]);

  return (
    <div className="results-page">
      <div className="results-container">
        <div className="results-avatar">
          <div>
            <img
              src={`${comic.picture}/portrait_uncanny.${comic.extension}`}
              alt={comic.name}
            />
            {}
            <button
              onClick={() => {
                if (!favorites) {
                  history.push("/signin");
                } else {
                  isFavorite
                    ? removeFavorite(id, "comics")
                    : addFavorite(favoriteData, "comics");
                }
              }}
            >
              {btnContent}
            </button>
          </div>
        </div>
        <section className="results-infos">
          <div className="results-name">
            <h2>{comic.title}</h2>
          </div>
          <div className="results-description">
            <p>{comicDescription}</p>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Comic;
