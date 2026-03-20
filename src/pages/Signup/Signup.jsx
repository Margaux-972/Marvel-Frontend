import "./Signup.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isConnected, setIsConnected] = useState(
    Cookies.get("userToken") || null,
  );

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };
  return (
    <main>
      <div className="container">
        <h1>S'inscrire</h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            console.log(username, email, password);

            try {
              const response = await axios.post(
                "http://localhost:3000/user/signup",
                {
                  email: email,
                  username: username,
                  password: password,
                },
              );
              console.log(response.data);
              if (response.data.token) {
                setErrorMessage("");

                Cookies.set("userToken", response.data.token);
                setIsConnected(response.data.token);

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
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email"
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

          <button>S'inscrire</button>
        </form>
        <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    </main>
  );
};

export default Signup;
