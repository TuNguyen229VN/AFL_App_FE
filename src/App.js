import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePageComponent/HomePage";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
        </Routes>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;
