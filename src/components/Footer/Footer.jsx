import "./Footer.css";
import reactLogo from "../../assets/react.svg";

const Footer = () => {
  return (
    <footer>
      <p>
        Made by{" "}
        <a href="https://github.com/Margaux-972" target="_blank">
          Margaux
        </a>{" "}
        with <span>React</span>
      </p>{" "}
      <img src={reactLogo} alt="Logo React" />
    </footer>
  );
};

export default Footer;
