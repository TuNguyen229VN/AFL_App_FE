import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePageComponent/HomePage";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import MyTournamemts from "./components/FindTournamentComponent/MyTournament";
import MyTeam from "./components/FindTeamComponent/MyTeam";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import CreateTeam from "./components/CreateTeamComponent/CreateTeam";
import CreateTournament from "./components/CreateTournament/CreateTournament";
function App() {
  const exclusionArray = ["/login", "/signup"];
  console.log(window.location.pathname)
  return (
    <div>
      <BrowserRouter>
        {exclusionArray.indexOf(window.location.pathname) < 0 && <Header />}
        <ScrollToTop/>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="/home" element={<HomePage/>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/findTournaments" element={<MyTournamemts/>} />
          <Route exact path="/findTeams" element={<MyTeam/>} />
          <Route exact path="/createTeam" element={<CreateTeam/>} />
          <Route exact path="/createTournament" element={<CreateTournament/>} />
        </Routes>
        {exclusionArray.indexOf(window.location.pathname) < 0 && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
