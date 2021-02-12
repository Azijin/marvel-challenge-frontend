import { useLocation, useParams } from "react-router-dom";
const Comic = (props) => {
  const { addFavorites } = props;

  const { id } = useParams();

  const location = useLocation();
  const comic = location.state;
  let comicDescription = comic.description ? comic.description : false;
  if (comicDescription) {
    if (comic.description.indexOf("<br>") !== -1) {
      comicDescription = comicDescription.replace(/<br>/g, "");
    }
  }

  return (
    <div className="results-page">
      <div className="results-container">
        <div className="results-avatar">
          <div>
            <img
              src={`${comic.picture}/portrait_uncanny.${comic.extension}`}
              alt={comic.name}
            />
            <button
              onClick={() => {
                addFavorites(id, "comics");
              }}
            >
              Add to favorite
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
