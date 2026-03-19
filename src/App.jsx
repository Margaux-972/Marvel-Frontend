import "./App.css";
import Home from "./pages/Home/Home";
import Char from "./pages/Char/Char";
import Characters from "./pages/Characters/Characters";
import Comics from "./pages/Comics/Comics";
import Header from "./components/Header/Header";
import Favorites from "./pages/Favorites/Favorites";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
