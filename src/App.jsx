import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Characters from "./pages/Characters/Characters";
import Comics from "./pages/Comics/Comics";
import Header from "./components/Header/Header";

function App() {
  const [count, setCount] = useState(0);
  const fetchData = async () => {
    const response = await axios.post("http://localhost:3000/");
  };

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/comics" element={<Comics />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
