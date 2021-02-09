import { useHistory } from "react-router-dom";

const Card = (props) => {
  const history = useHistory();
  const { title, picture, extension, id, pageContent } = props;

  return (
    <div
      className="card"
      onClick={() => {
        if (pageContent === "character") {
          id && history.push(`/${pageContent}/${id}`);
        } else if (pageContent === "comic") {
          console.log("go to comic page");
          history.push({ pathname: `/${pageContent}/${id}`, state: props });
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
  );
};
export default Card;
