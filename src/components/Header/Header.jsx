import "./Header.css";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Header = ({ token, handleToken }) => {
  // const [isConnected, setIsConnected] = useState(
  //   Cookies.get("userToken") || null,
  // );
  return (
    <header>
      <div>
        <Link to="/">
          <img src={logo} alt="logo Marvel" />
        </Link>
        {token ? (
          <section>
            <button
              className="disconnected"
              onClick={() => {
                handleToken(null);
              }}
            >
              LOG OUT
            </button>
          </section>
        ) : (
          <section>
            <Link to="/login">
              <button>LOG IN</button>
            </Link>
            <Link to="/signup">
              <button>SIGN UP</button>
            </Link>
          </section>
        )}
      </div>
      <div>
        <section>
          <Link to="/characters">
            <button>CHARACTERS</button>
          </Link>
          <Link to="/comics">
            <button>COMICS</button>
          </Link>
          <Link to="/favorites">
            <button>FAVORITES</button>
          </Link>
        </section>
      </div>
    </header>
  );
};

export default Header;
