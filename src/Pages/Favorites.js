/*
Favorites pages
*/

import { Redirect, Link } from "react-router-dom";

import Loading from "../Components/Loading";
import Card from "../Components/Card";

const Favorites = (props) => {
  const {
    favorites,
    authToken,
    isInFavorites,
    addFavorite,
    removeFavorite,
  } = props;

  const characters = favorites ? favorites.characters : [];
  const comics = favorites ? favorites.comics : [];

  return authToken ? (
    favorites ? (
      <div className="favorites-page">
        <section className="favorites-comics">
          <h2>Favorites comics</h2>
          {comics.length === 0 ? (
            <>
              <p>No Favorites</p>
              <Link to="/comics">Go get some !</Link>
            </>
          ) : (
            <div className="favorites-container">
              {comics.map((comic, index) => {
                return (
                  <Card
                    key={index}
                    pageContent="comics"
                    title={comic.title}
                    picture={comic.thumbnail.path}
                    extension={comic.thumbnail.extension}
                    id={comic.id}
                    favorites={favorites}
                    isInFavorites={isInFavorites}
                    addFavorite={addFavorite}
                    removeFavorite={removeFavorite}
                  />
                );
              })}
            </div>
          )}
        </section>
        <section className="favorites-characters">
          <h2>Favorites characters</h2>
          {characters.length === 0 ? (
            <>
              <p>No Favorites</p>
              <Link to="/characters">Go get some !</Link>
            </>
          ) : (
            <div className="favorites-container">
              {characters.map((character, index) => {
                return (
                  <Card
                    key={index}
                    pageContent="characters"
                    title={character.name}
                    picture={character.thumbnail.path}
                    extension={character.thumbnail.extension}
                    id={character.id}
                    favorites={favorites}
                    isInFavorites={isInFavorites}
                    addFavorite={addFavorite}
                    removeFavorite={removeFavorite}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
    ) : (
      <Loading />
    )
  ) : (
    <Redirect to="/" />
  );
};
export default Favorites;
