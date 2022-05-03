import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePageComponent/HomePage";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import MyTournamemts from "./components/FindTournamentComponent/MyTournament";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
function App() {
  const exclusionArray = ["/login", "/signup"];
  return (
    <div>
      <BrowserRouter>
        {exclusionArray.indexOf(window.location.pathname) < 0 && <Header />}
        <ScrollToTop/>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/findTournaments" element={<MyTournamemts/>} />
        </Routes>
        {exclusionArray.indexOf(window.location.pathname) < 0 && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
