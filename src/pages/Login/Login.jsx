import "./Login.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ handleToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  return (
    <main className="login-page">
      <div className="container">
        <h1>Se connecter</h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              const response = await axios.post(
                "https://site--marvel-backend--n9gj5w2bwq52.code.run/user/login",
                {
                  email: email,
                  password: password,
                },
              );
              console.log(response.data);
              if (response.data.token) {
                // on change le state de connection (pour l'affichage dans le header) :
                handleToken(response.data.token);

                navigate("/");
              }
            } catch (error) {
              if (error.response) {
                setErrorMessage(error.response.data.message);
              } else {
                console.log(error);
              }
            }
          }}
        >
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(event) => {
              handleChange(event, setEmail);
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => {
              handleChange(event, setPassword);
            }}
          />

          <button>Se connecter</button>
        </form>
        <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    </main>
  );
};

export default Login;
