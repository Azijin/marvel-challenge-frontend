/*
loader to display while waiting for the return of the request
*/
import LoadingIndicator from "../assets/img/loading-indicator.gif";
import marvelAnimation from "../assets/img/marvel-animation.gif";

const Loading = (props) => {
  return (
    <div className="isLoading">
      <div className="isLoading-container">
        <div>
          <img src={marvelAnimation} alt="marvel logo animation" />
        </div>
        <div>
          <img src={LoadingIndicator} alt="page is loading" />
        </div>
      </div>
    </div>
  );
};
export default Loading;
