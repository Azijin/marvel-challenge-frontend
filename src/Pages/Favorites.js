const Favorites = (props) => {
  const { favorites } = props;
  const characters = favorites.characters ? favorites.characters : [];
  const comics = favorites.comics ? favorites.comics : [];
  return (
    <div>
      <div>
        <ul>
          {comics.map((comic, index) => {
            return <li key={index}>${comic}</li>;
          })}
        </ul>
      </div>
      <div>
        <ul>
          {characters.map((comic, index) => {
            return <li key={index}>${comic}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
export default Favorites;
