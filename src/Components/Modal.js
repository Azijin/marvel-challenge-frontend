import React from "react";
import { Link } from "react-router-dom";

const Modal = (props) => {
  const { isModalDisplay, handleModalDisplay, username } = props;
  const modalClass = isModalDisplay ? "modal-open" : "modal-close";
  return (
    <div id="myModal" className={`modal ${modalClass}`}>
      <div className="modal-content">
        <h2>Congratulations {username} !</h2>
        <hr />
        <p>You have successfully completed the registration form.</p>
        <p>However, as this site is a demo, therefore no recording is made.</p>
        <p>
          If you want to test the functionality of a logged in user, you can
          login through the <Link to="signin">signin page</Link> with the demo
          account
        </p>
        <button onClick={handleModalDisplay}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
