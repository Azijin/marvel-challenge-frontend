import { useLocation } from "react-router-dom";
const Comic = (props) => {
  const location = useLocation();
  const comic = location.state;

  console.log(comic);
  return (
    <div className="character-page">
      <div className="character-container">
        <div className="character-avatar">
          <img
            src={`${comic.picture}/portrait_uncanny.${comic.extension}`}
            alt={comic.name}
          />
        </div>
        <section className="character-infos">
          <div className="character-name">
            <h2>{comic.title}</h2>
          </div>
          <div className="character-description">
            <p>{comic.description.replace(/<br>/g, "")}</p>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Comic;
