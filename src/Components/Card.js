/* 
card component used in characters, comics and favorites pages.
the page Content prop's is used to determine:
- what type of content the map should display
- navigation to the page
- the data object to save it as favorites
- the add to favorites function

the isFavorite state manage 
- the displays of the card if the comic or character is in favorites
- which function should be triggered: add or remove favorites
*/

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

  const dataForFavorite = {
    id: id,
    thumbnail: {
      path: picture,
      extension: extension,
    },
  };

  if (pageContent === "characters") {
    dataForFavorite.name = title;
  } else if (pageContent === "comics") {
    dataForFavorite.title = title;
  }

  let classNameFavorite = isFavorite ? "is-favorite" : "not-favorite";

  useEffect(() => {
    isInFavorites(id, pageContent, setIsFavorite);
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
              addFavorite(dataForFavorite, pageContent);
            } else {
              removeFavorite(id, pageContent);
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
