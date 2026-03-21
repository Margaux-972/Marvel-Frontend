import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo Marvel" />
      </Link>
      <div>
        <section>
          <Link to="/characters">
            <button>Characters</button>
          </Link>
          <Link to="/comics">
            <button>Comics</button>
          </Link>
          <Link to="/favorites">
            <button>Favorites</button>
          </Link>
        </section>
        <section>
          <Link to="/login">
            <button>LOG IN</button>
          </Link>
          <Link to="/signup">
            <button>SIGN UP</button>
          </Link>
        </section>
      </div>
    </header>
  );
};

export default Header;
