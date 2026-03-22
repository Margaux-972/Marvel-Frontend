import "./App.css";
import Cookies from "js-cookie";
import Com from "./pages/Com/Com";
import Char from "./pages/Char/Char";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Comics from "./pages/Comics/Comics";
import Signup from "./pages/Signup/Signup";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Favorites from "./pages/Favorites/Favorites";
import Characters from "./pages/Characters/Characters";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setToken(token);
    } else {
      Cookies.remove("userToken");
      setToken(null);
    }
  };

  return (
    <>
      <Router>
        <Header token={token} handleToken={handleToken} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/character/:_id" element={<Char />} />
          <Route path="/comic/:_id" element={<Com />} />
          <Route path="/login" element={<Login handleToken={handleToken} />} />
          <Route
            path="/signup"
            element={<Signup handleToken={handleToken} />}
          />
          <Route
            path="/favorites"
            element={
              token ? <Favorites token={token} /> : <Navigate to="/login" />
            }
          />
          <Route path="*" element={<div className="container"> OOPS !!</div>} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
