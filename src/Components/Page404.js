import grootDancing from "../assets/img/groot-dancing.gif";
const Page404 = () => {
  return (
    <div className="page404">
      <div className="page404-container">
        <div>
          <h2>Page not found</h2>
        </div>
        <div>
          <img src={grootDancing} alt="groot dancing" />
        </div>
      </div>
    </div>
  );
};
export default Page404;
