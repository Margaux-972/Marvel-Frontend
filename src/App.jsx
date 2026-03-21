import "./App.css";
import Cookies from "js-cookie";
import Com from "./pages/Com/Com";
import Char from "./pages/Char/Char";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Comics from "./pages/Comics/Comics";
import Signup from "./pages/Signup/Signup";
import Header from "./components/Header/Header";
import Favorites from "./pages/Favorites/Favorites";
import Characters from "./pages/Characters/Characters";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const userToken = Cookies.get("userToken");

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/character/:_id" element={<Char />} />
          <Route path="/comic/:_id" element={<Com />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/favorites"
            element={<Favorites userToken={userToken} />}
          />
          <Route path="*" element={<div className="container"> OOPS !!</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
