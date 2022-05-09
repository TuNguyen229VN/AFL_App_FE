import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import { useEffect, useState } from "react";
import InforTeamDetail from "./components/TeamDetailComponent/InforTeamDetail";
import ListPlayer from "./components/TeamDetailComponent/ListPlayer";
import ReportTeamDetail from "./components/TeamDetailComponent/ReportTeamDetail";
import CommentTeamDetail from "./components/TeamDetailComponent/CommentTeamDetail";

function App() {
  // const [first, setfirst] = useState(window.location.pathname)
  // let HideHeader =
  //   window.location.pathname === "/login" ||
  //   window.location.pathname === "/signup" ? null : (
  //     <Header />
  //   );

  const exclusionArray = ["/login", "/signup"];
  return (
    <div>

      <BrowserRouter>
        {/* {HideHeader} */}
        {exclusionArray.indexOf(window.location.pathname) < 0 && <Header />}
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/findTournaments" element={<MyTournamemts />} />
          <Route exact path="/findTeam" element={<MyTeam />} />
          <Route exact path="/createTeam" element={<CreateTeam />} />
          <Route exact path="/teamDetail" element={<InforTeamDetail />} />
          <Route exact path="/inforTeamDetail" element={<InforTeamDetail />} />
          <Route exact path="/listPlayer" element={<ListPlayer />} />
          <Route
            exact
            path="/reportTeamDeatail"
            element={<ReportTeamDetail />}
          />
          <Route
            exact
            path="/commentTeamDetail"
            element={<CommentTeamDetail />}
          />
          <Route
            exact
            path="/createTournament"
            element={<CreateTournament />}
          />
        </Routes>
        {exclusionArray.indexOf(window.location.pathname) < 0 && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
