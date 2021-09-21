import React from "react";
import { useHistory } from "react-router-dom";

const PageError = () => {
  const history = useHistory();

  return (
    <div className="page-error">
      <h2>we are sorry an error occured</h2>
      <div>
        <button
          onClick={() => {
            history.push("/");
          }}
        >
          Go back home
        </button>
      </div>
    </div>
  );
};

export default PageError;
