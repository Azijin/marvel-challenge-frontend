import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = (props) => {
  const history = useHistory();
  const {
    title,
    picture,
    extension,
    id,
    pageContent,
    isInFavorites,
    favorites,
    addFavorite,
    removeFavorite,
  } = props;

  const [isFavorite, setIsFavorite] = useState(false);
  const classNameFavorite = isFavorite ? "is-favorite" : "not-favorite";

  useEffect(() => {
    if (favorites) {
      isInFavorites(id, pageContent, setIsFavorite);
    }
  }, [favorites]);

  return (
    <div className="card">
      <div
        className="favorite-container"
        onClick={() => {
          if (!favorites) {
            history.push("/signin");
          } else {
            if (!isFavorite) {
              addFavorite(
                {
                  id: id,
                  title: title,
                  thumbnail: {
                    path: picture,
                    extension: extension,
                  },
                },
                pageContent
              );
            } else {
              removeFavorite(
                {
                  id: id,
                  title: title,
                  thumbnail: {
                    path: picture,
                    extension: extension,
                  },
                },
                pageContent
              );
            }
          }
        }}
      >
        <FontAwesomeIcon
          className={`favorite-icon ${classNameFavorite}`}
          icon="heart"
        />
      </div>

      <div
        onClick={() => {
          if (pageContent === "characters") {
            history.push(`/character/${id}`);
          } else if (pageContent === "comics") {
            history.push({
              pathname: `/comic/${id}`,
              state: { title, picture, extension, id, pageContent },
            });
          }
        }}
      >
        <div className="card-picture">
          <img src={`${picture}/portrait_xlarge.${extension}`} alt={title} />
        </div>
        <div className="card-infos">
          <div className="card-title">
            <p>{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
