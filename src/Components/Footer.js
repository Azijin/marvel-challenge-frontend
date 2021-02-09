import ReactLogo from "../assets/img/logo.svg";
import LeReacteur from "../assets/img/logo-le-reacteur-2.png";

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="signature">
        <p>
          Made with
          <img src={ReactLogo} alt="React logo" />
          <strong>React</strong>
          <img src={ReactLogo} alt="React logo" />
          at{" "}
          <a href="https://www.lereacteur.io/" target="blank">
            <img src={LeReacteur} alt="Le Reacteur bootcamp logo" />
          </a>
          By <strong>Arthur Chen</strong>
        </p>
        <div>
          <a
            href="https://www.linkedin.com/in/arthur-chen-283857186/"
            target="blank"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/Azijin" target="blank">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
