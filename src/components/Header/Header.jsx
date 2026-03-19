import "./Header.css";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo Marvel" />
      </Link>
      <div>
        <Link to="/Characters">
          <button>Characters</button>
        </Link>
        <Link to="/Comics">
          <button>Comics</button>
        </Link>
        <Link to="/Favorites">
          <button>Favorites</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
